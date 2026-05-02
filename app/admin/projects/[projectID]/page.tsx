"use server"
interface PageProps {
    params: Promise<{projectID: string}>
}
import {getProjectById} from '@admin/actions/projects'
import Editor from './projectEditor'
export default async function Project({params}: PageProps) {
    const {projectID} = await params;
    const project = await getProjectById(Number(projectID));
    if (!project) return <div>Project No Found</div>
    return (
        <>
        <Editor project={project}/>
        </>)
}
