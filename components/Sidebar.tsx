import {projects} from '@data/projects'
import {toId} from '@common/helper'
const Sidebar = ()=>{
    return (
        <nav className="border-neutral-400 border-r h-full overflow-auto pt-5 p-8">
            <h1 className="text-xl uppercase font-bold mb-8">
                ESP32 LOG
            </h1>
            <div className="mb-10">
                <h2 className="text-sm text-zinc-400 tracking-widest">Projects</h2>
                {(projects.length > 0) && (
                    <ul className="space-y-2">
                    {projects.map((project, index)=>(
                        <li key={index}>
                            <a href={`#${toId(project.title)}`} className="hover:underline block text-xs">{project.title}</a>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            <div className="text-netural-400 text-xs">
                <p>Building Unessary Systems</p>
            </div>
        </nav>
    )
};
export default Sidebar;
