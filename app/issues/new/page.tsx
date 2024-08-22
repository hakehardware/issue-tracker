'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'

// Allows us to use the createIssueSchemea to define the IssueForm
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    })
    const router = useRouter()
    const [error, setError] = useState('')

    return (
        <div className="max-w-xl">
            <form
                className="space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        setError('An unexpected error ocurred.')
                    }
                })}
            >
                <TextField.Root
                    placeholder="Title"
                    {...register('title')}
                ></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button>Submit Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
