import AppSidebar from '@components/Sidebar'
import {SidebarProvider, SidebarTrigger, SidebarInset} from '@components/ui/sidebar'
import {cn} from '@/lib/utils'
export default function RootLayout({children, className}: Readonly<{children: React.ReactNode; className?: string}>) {
    return (
        <SidebarProvider className={cn("bg-black overflow-hidden", className)} style={{"--sidebar-background":"0 0% 0%"} as React.CSSProperties} >
            <AppSidebar/>
            <SidebarInset className="bg-transparent">
            <SidebarTrigger className="rounded-none"/>
            <main className="overflow-y-auto scroll-smooth h-screen">
                {children}
            </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
