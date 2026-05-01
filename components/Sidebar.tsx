import {projects} from '@data/projects'
import {toId} from '@common/helper'
import {Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@components/ui/sidebar'
import {cn} from '@/lib/utils'
const AppSidebar = ({className}: {className?: string}) => {
    return (
        <>
            <Sidebar className={cn("border-zinc-500 border-r pl-4 pr-2 h-full overflow-hidden pt-4 pb-2 [&_[data-sidebar='sidebar']]:!bg-transparent", className)} >
                <SidebarHeader className="p-0 ">

                    <h1 className="text-3xl uppercase font-bold mb-2 text-white">
                        ESP32 LOG
                    </h1>
                </SidebarHeader>
                <SidebarContent className="">
                    <SidebarGroup className="p-0 ">

                        <SidebarGroupLabel className="text-sm text-zinc-200 tracking-widest px-0 ">Projects</SidebarGroupLabel>

                        {(projects.length > 0) && (
                            <SidebarGroupContent className="">
                                <SidebarMenu className="p-0 ">

                                    {projects.map((project, index) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton className="bg-transparent hover:bg-transparent active:bg-transparent shadow-none px-0 py-0 text-xs text-zinc-400 transition-none hover:text-zinc-400 hover:underline rounded-none h-fit">
                                                <a href={`#${toId(project.title)}`}>{project.title}</a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        )}
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="text-zinc-600 text-xs whitespace-normal p-0">
                    <p>Building Unessary Systems</p>
                </SidebarFooter>
            </Sidebar>
        </>
    )
};
export default AppSidebar;
