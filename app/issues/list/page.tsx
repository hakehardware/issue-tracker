import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/db'
import { Status } from '@prisma/client'
import IssueActions from './IssueActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
    // Get list of valid statuses
    const statuses = Object.values(Status)

    // Ensure only valid statuses are included
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined

    const where = { status }

    // validate that the order by is valid and set to ascending
    const orderBy = columnNames.includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined

    const page = parseInt(searchParams.page) || 1
    const pageSize = 10

    // Filter by status & order
    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    })

    const issueCount = await prisma.issue.count({ where })

    return (
        <Flex direction="column" gap="3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination
                pageSize={pageSize}
                currentPage={page}
                issueCount={issueCount}
            />
        </Flex>
    )
}

export default IssuesPage
