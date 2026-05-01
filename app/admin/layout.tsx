"use server"
import '../globals.css'
import {SidebarProvider, SidebarTrigger, SidebarInset} from '@components/ui/sidebar'
import AdminSidebar from '@admin/components/Sidebar'
import {getProjectList} from '@admin/actions/projects'
export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const projectList = await getProjectList();
    return (
        <SidebarProvider className={`h-screen flex flex-row w-full overflow-hidden`}>
            <AdminSidebar projectList={projectList}/>
            <SidebarInset className="bg-transparent">
            <SidebarTrigger className="rounded-none"/>
            <main className="h-screen overflow-y-auto scroll-smooth">
                {children}
            </main>
            </SidebarInset>
        </SidebarProvider>
    )
};
