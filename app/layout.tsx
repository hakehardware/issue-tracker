import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import { Theme, Container } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Issue Tracker',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Theme>
                    <NavBar />
                    <main className='p-5'><Container>{children}</Container></main>
                </Theme>
            </body>
        </html>
    )
}
