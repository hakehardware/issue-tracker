'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get<User[]>('/api/users')
            setUsers(data)
        }

        fetchUsers()
    }, [])

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || 'unassigned'}
                onValueChange={async (userId) => {
                    try {
                        await axios.patch('/api/issues/' + issue.id, {
                            assignedToUserId:
                                userId !== 'unassigned' ? userId : null,
                        })
                    } catch (error) {
                        toast.error('Changed could not be saved')
                    }
                }}
            >
                <Select.Trigger placeholder="Assign..."></Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        {users.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </>
    )
}

export default AssigneeSelect
