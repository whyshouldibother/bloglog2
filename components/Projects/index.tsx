import {getProjectView} from '@/actions/projects'
import {projectViewType} from '@/types/projects'
import {Card, CardTitle, CardHeader, CardContent} from '@components/ui/card'
import {Badge} from '@components/ui/badge'
import {format} from "date-fns"
import {toId} from '@common/helper'
const Projects = async () => {
    const projects = await getProjectView();
    return (
        <div>
            {projects.map((project: projectViewType) => {
                return (
                    <article key={project.id} id={toId(project.title)}>
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
                            <p className="text-zinc-400 text-sm leading-relaxed font-virgil">
                                {project.description}
                            </p>


                            <div className="flex flex-row gap-2">
                                <Card className="rounded-none bg-black w-1/2">
                                    <CardHeader className="text-zinc-600 p-0 text-xs uppercase underline underline-offset-8 tracking-[0.2em]"><CardTitle>Pending</CardTitle></CardHeader>
                                    <CardContent className="text-zinc-400 px-2">
                                        <ul className="space-y-2 list-square p-0 text-sm font-virgil">

                                            {project.pendingTodos.length > 0 ? (
                                                project.pendingTodos.map((task) => (<li key={task.id}>{task.todo}</li>))
                                            ) : "No pending tasks"}
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-none bg-black w-1/2">
                                    <CardHeader className="text-zinc-600 p-0 text-xs uppercase underline underline-offset-8 tracking-[0.2em]"><CardTitle>Completed</CardTitle></CardHeader>
                                    <CardContent className="text-zinc-600 px-2">
                                        <ul className="space-y-2 list-none p-o line-through font-virgil">

                                            {project.completedTodos.length > 0 ? (
                                                project.completedTodos.map((task) => (<li key={task.id}>{task.todo}</li>))
                                            ) : "Nothing done yet"}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="flex flex-col-reverse gap-2 border-l border-zinc-800 pl-4 relative">

                                {project.versions.map((version) => {
                                    return (

                                        <section key={version.versionid} className="group relative mb-2">
                                            <div className="absolute -left-6 top-1 w-4 h-4 bg-black border border-white group-hover:bg-white transition-colors rounded-full z-10" />
                                            <details className="group/details" open={version.open}>
                                                <summary className="list-none cursor-pointer outline-none">
                                                    <div className="flex flex-col mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                                                                Version: {version.versionid}
                                                            </h3>
                                                            {version.tags.map((tag, index) => (
                                                                <Badge key={index} className="text-[0.625rem] px-2 py-0.5 border border-zinc-800 bg-black !rounded-none" style={{color: tag.color}}>
                                                                    {tag.title}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        {
                                                            version.creation && (
                                                                <time className="text-[0.625rem] text-zinc-600 uppercase font-thin tracking-widest mt-1">
                                                                    {format(new Date(version.creation), "do MMMM yyyy")}
                                                                </time>
                                                            )
                                                        }
                                                    </div>
                                                    <p className="text-zinc-400 leading-snug text-sm font-virgil">{version.description}</p>
                                                </summary>
                                                {version.circuit && (<figure className="border border-zinc-800 max-w-sm flex flex-col items-center gap-0 mt-2">
                                                    <img src={`/api/image/svg/${version.circuit.imageid}`} alt={version.circuit.alt} className='w-full max-w-xs h-auto block' />
                                                    <figcaption>
                                                    <p className="text-sm font-mono tracking-tighter text-zinc-600">
                                                    {`Circuit Diagam:${version.versionid}`}
                                                    </p>
                                                    </figcaption>
                                                </figure>
                                                )}
                                                {
                                                    version.notes.length > 0 &&
                                                    <ul className="list-disc list-inside mt-2 font-virgil">
                                                        {version.notes.map(note => (
                                                            <li key={note.id} className="text-xs text-zinc-600">{note.note}</li>
                                                        ))}
                                                    </ul>
                                                }
                                            </details>
                                        </section>
                                    )
                                })}
                            </div>
                        </div>
                    </article>
                )
            })}
        </div >
    );
}
export default Projects
