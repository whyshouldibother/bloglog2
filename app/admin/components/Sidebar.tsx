"use client";
import {Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuAction, SidebarMenuSubItem, SidebarMenuSubButton} from '@components/ui/sidebar'
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from '@components/ui/collapsible'
import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'
type menuItemType = {
    label: string;
    action: string | (() => void);
    subMenu?: Array<menuItemType>;
}
type SidebarGroupItemType = {
    label: string;
    items: Array<menuItemType>;
}

const SidebarSubGroupItem = ({items}: {items: menuItemType}) => {
    const router = useRouter();
    function handleMenuAction(action: menuItemType["action"]) {
        if (typeof action === "string") {
            router.push(action);
        } else {
            action();
        }
    }
    return (<>
        <Collapsible defaultOpen={false} className="group/collapsible">
             <SidebarMenuItem className="flex items-center w-full">
                    <SidebarMenuButton className="flex-1 bg-transparent hover:bg-transparent active:bg-transparent shadow-none px-0 py-0 text-xs text-zinc-400 transition-none hover:text-zinc-400 hover:underline rounded-none h-fit cursor-pointer" onClick={() => handleMenuAction(items.action)}>{items.label}</SidebarMenuButton>
                <CollapsibleTrigger className="px-0 py-0 text-xs text-zinc-400 cursor-pointer">+
                </CollapsibleTrigger>
            </SidebarMenuItem>
           <CollapsibleContent>
            {(items.subMenu && items.subMenu.length>0)?(
                <SidebarMenuSub className="p-y-0 ml-0 border-l-zinc-800">
                    {items.subMenu.map((item, index) => 
                        (item.subMenu?(<SidebarSubGroupItem items={item}/>):(
                            <SidebarMenuSubItem key={index}>
                                <SidebarMenuSubButton className="bg-transparent hover:bg-transparent active:bg-transparent shadow-none px-0 py-0 text-xs text-zinc-400 transition-none hover:text-zinc-400 hover:underline rounded-none h-fit cursor-pointer" >{item.label}</SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))
                    )}
                </SidebarMenuSub>):(<span className="text-2xs text-zinc-600">Nothing here yet</span>)
            }
            </CollapsibleContent>
        </Collapsible>
    </>
    )

}
const SidebarGroupItem = ({menuItems}: {menuItems: SidebarGroupItemType}) => {
    const router = useRouter();
    function handleMenuAction(action: menuItemType["action"]) {
        if (typeof action === "string") {
            router.push(action);
        } else {
            action();
        }
    }
    return (
        <SidebarGroup className="p-0">
            <SidebarGroupLabel className="text-sm text-zinc-200 tracking-wdiest px-0">{menuItems.label}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="p-0">
                    {menuItems.items.map((item, index) =>
                    (
                        item.subMenu ? (<SidebarSubGroupItem key={index} items={item} />) : (
                            <SidebarMenuItem>
                                <SidebarMenuButton className="bg-transparent hover:bg-transparent active:bg-transparent shadow-none px-0 py-0 text-xs text-zinc-400 transition-none hover:text-zinc-400 hover:underline rounded-none h-fit cursor-pointer" onClick={() => handleMenuAction(item.action)}>
                                    {item.label}
                                </SidebarMenuButton>
                            </SidebarMenuItem>)
                    ))
                    }
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup >
    )
};
const AdminSidebar = ({projectList}:{projectList:Array<string>}) => {
    console.log(projectList);
    return (
        <Sidebar className="border-zinc-500 border-r h-full overflow-hidden pt-4 pr-2 pl-4  pb-2 [&_[data-sidebar='sidebar']]:!bg-transparent">
            <SidebarHeader className="p-0">
                <h1 className="text-3xl uppercase font-bold mb-2 text-white">
                    ESP32 ADMIN
                </h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroupItem menuItems={{label: "Workspace", items: [{label: "Preview", action: "/admin/"}, {label: "Web", action: "/"}]}} />
                <SidebarGroupItem menuItems={{label: "Content", items: [{label: "Projects", action: "/admin/projects/", subMenu:projectList.map((item:string)=>({label:item, action:""}))}, {label: "Tags", action: "/admin/tags/"}]}} />
                <SidebarGroupItem menuItems={{label: "Administration", items: [{label: "Accounts", action: "/admin/accounts"}]}} />
                <SidebarGroupItem menuItems={{label: "Session", items: [{label: "Sign Out", action: () => {signOut({callbackUrl: "/"})}}]}} />
            </SidebarContent>
            <SidebarFooter className="text-zinc-600 text-xs whitespace-normal p-0">
                <p>Editing Unessary Systems</p>
            </SidebarFooter>
        </Sidebar>
    )
};
export default AdminSidebar;
