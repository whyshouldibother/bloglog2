"use client";
import {projects} from '@data/projects'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
type menuItemType = {
    title: string;
    path?: string;
    subMenu?: Array<menuItemType>;
}
const Sidebar = () => {
    const router = useRouter();
    const menu: Array<menuItemType> = [
        {title: 'Overview', path:'/'},
        {
            title: 'Projects', ...(projects.length > 0 && {
                subMenu: projects.map((project) => ({
                    title: project.title
                })),
            }),
        },
        {title: 'Tags', path:'tags'},
        {title: 'Web', path:'..'}
    ];
    const MenuItem = ({item, ...props}: {item: menuItemType}) => {
        const [isOpen, setIsOpen] = useState(false);
        const hasChildren = item.subMenu && item.subMenu.length>0;
        const Tag = isOpen? 'li':'h2';
        return (<div  {...props} className="text-xs cursor-pointer">

             <Tag onClick={() => {
                 if(item.path){
                     router.push(`/admin/${item.path}`);
                    router.refresh();
                 }
                 setIsOpen(!isOpen);
             }} className={`${(isOpen && hasChildren)?'text-sm text-zinc-400 tracking-widest':'text-xs block hover:underline'}`}>
                {item.title}
            </Tag>
            <ul className={`pl-2 border-l border-zinc-400 space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-fit opacity-full' :'max-h-0 opacity-0'}`}>
                        {hasChildren &&  item.subMenu?.map((subItem, index) => (
                            <MenuItem key={index} item={subItem} />
                        ))}
            </ul>
        </div>
        )
    }
    return (
        <nav className="border-neutral-400 border-r h-full overflow-auto pt-5 p-8">
            <h1 className="text-xl uppercase font-bold mb-8">
                ESP32 ADMIN
            </h1>
            <div className="mb-10">
                <ul className="space-y-2">
                    {menu.map((item, index) => (
                        <MenuItem key={index} item={item} />
                    ))}
                </ul>
            </div>
            <div className="text-netural-400 text-xs">
                <p>Editing Unessary Systems</p>
            </div>
        </nav>
    )
};
export default Sidebar;
