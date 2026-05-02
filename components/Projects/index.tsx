"use server"
import {getTag} from '@data/projects'
import {toId} from '@common/helper'
import {Badge} from '@components/ui/badge'
import {getProjectView} from '@/actions/projects'
import {projectViewType} from '@/types/projects'
const Projects = async () => {
    const projects = await getProjectView();
    console.log(projects);
    console.log(projects[0].links)
    return (
        <div>
            {projects.map((project: projectViewType) => {
                return (
                    <article key={project.id}>
                        <div className="mb-4">
                            <div className="flex items-center gap-4 mb-2">
                                <h2 className="text-4xl font-bold uppercase tracking-tighter text-white">{project.title}</h2>
                                {
                                    (project.links.length > 0) && (
                                        project.links.map((link, index) =>
                                        (
                                            <a key={index} href={link.url} className="text-xs border border-zinc-500 px-2 py-1 hover:bg-white hover:text-black transition-colors cursor-pointer">{link.title}</a>
                                        )

                                        ))
                                }
                            </div>
                            <p className="text-zinc-600">
                                {project.description}
                            </p>
                        </div>
                    </article>
                )
            })}
            {
                // {projects.map((project,index)=>{
                //     return(
                //     <article key={index} id={toId(project.title)}>
                //       <div className="flex items-baseline gap-4 mb-6">
                //           <h2 className="text-3xl font-bold uppercase tracking-tighter text-white">
                //               {project.title}
                //           </h2>
                //           {(project.links.length > 0) && (
                //               project.links.map((link ,index) =>{
                //                   return(
                //                       <a href={link.link} key={index} className="text-xs border border-zinc-500 px-2 py-1 hover:bg-white hover:text-black transition-colors">{link.name}</a>
                //                   )
                //               })
                //           )}
                //       </div>
                //       <div className="grid md:grid-cols-2 gap-12 p-8 mb-12">
                //           {
                //               (project.tasks.pending.length > 0) &&(
                //                   <div>
                //                   <h3 className="text-sm font-bold uppercase mb-4 text-zinc-200 underline underline-offset-4">Pending</h3>
                //                   <ul className="space-y-3 text-sm list-inside list-square">
                //                   {
                //                   project.tasks.pending.map((task, index)=>{  
                //                       return <li key={index}>{task}</li>;
                //                   })
                //                   }
                //                   </ul>
                //                   </div>
                //               )      
                //           }
                //
                //           {    (project.tasks.completed.length > 0) &&(
                //                   <div className="border-t md:border-t-0 md:border-l border-zinc-800 pt-8 md:pt-0 md:pl-8">
                //                   <h3 className="text-sm font-bold uppercase mb-4 text-zinc-200 underline underline-offset-4">Completed</h3>
                //                   <ul className="space-y-3 text-sm list-inside list-square line-through decoration-zinc-600 text-zinc-600">
                //                   {
                //                   project.tasks.completed.map((task, index)=>{  
                //                       return <li key={index}>{task}</li>;
                //                   })
                //                   }
                //                   </ul>
                //                   </div>
                //               )      
                //           }
                //       </div>
                //       <div className="flex flex-col-reverse relative border-l border-white/20 ml-4 md:ml-0">
                //       {project.versions.map((version, index) => {
                //           return(
                //           <section key={index} className="relative pl-8 pb-12 group">
                //               <div className="absolute -left-[12px] w-4 h-4 bg-black border border-white group-hover:bg-white transition-colors rounded-lg"/>
                //               <details className="group/details">
                //                   <summary className="list-none cursor-pointer outline-none">
                //                       <div className="flex flex-col mb-4">
                //                       <div className="flex items-center gap-3">
                //                           <span className="text-xl font-bold uppercase tracking-tight text-zinc-200">Version {version.version}</span>
                //                           {version.tags.map((tag, index)=>{
                //                               let tagInfo = getTag(tag);
                //                               return <Badge key={index} className={`border rounded-none border-zinc-500 background-mist-950 ${tagInfo.color}`}>{tagInfo.title}</Badge>
                //                           })}
                //                       </div>
                //                       </div>
                //                       <div className="space-y-4 max-w-3xl">
                //                           <p className="text-zinc-300 leading-relaxed">{version.description}</p>
                //                       </div>
                //                   </summary>
                //                   <div className="space-y-4 max-w-2xl">
                //                   <ul>
                //                       {version.points.map((point, index)=>{
                //                          return <li key={index} className="text-sm list-disc list-inside text-zinc-400 space-y-1">{point}</li>
                //                       })}
                //                   </ul>
                //                   </div>
                //               </details> 
                //           </section>
                //           )
                //       })}
                //       </div>
                //     </article>
                //     )
                // })}
            }
        </div>
    );
}
export default Projects
