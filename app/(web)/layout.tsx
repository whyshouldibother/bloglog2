import AppSidebar from '@components/Sidebar'
import {SidebarProvider, SidebarTrigger, SidebarInset} from '@components/ui/sidebar'
export default function RootLayout({children}:Readonly<{children: React.ReactNode}>) {
    return (
        <SidebarProvider className="bg-black overflow-hidden w-full flex flex-row h-screen" style={{"--sidebar-background": "0 0% 0%"} as React.CSSProperties} >
            <AppSidebar />
            <SidebarTrigger className="rounded-none" />
            <SidebarInset className="bg-transparent">
                <main className="overflow-y-auto scroll-smooth h-screen">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
