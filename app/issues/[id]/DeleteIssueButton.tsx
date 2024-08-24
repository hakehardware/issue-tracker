'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const [error, setError] = useState(false)

	const deleteIssue = async () => {
		try {
			await axios.delete(
				'/api/issues/' + issueId
			)
			router.push('/issues')
			router.refresh()
		} catch (error) {
			setError(true)
		}
	}

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Delete Issue</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue?
                    </AlertDialog.Description>
                    <Flex mt="5" gap="5">
                        <AlertDialog.Cancel>
                            <Button color="gray">Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                color="red"
                                onClick={deleteIssue}
                            >
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue could not be deleted
                    </AlertDialog.Description>
                    <Button onClick={() => setError(false)} mt="2" variant="soft" color="gray">
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
