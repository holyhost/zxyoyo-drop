import React from 'react'
import { MantineProvider } from '@mantine/core'
import { AppLayout } from '@/components/layout/AppLayout'
const MantineLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <section>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'light',
                }}
            >
                <AppLayout>
                    {children}
                </AppLayout>
            </MantineProvider>
        </section>
    )
}

export default MantineLayout
