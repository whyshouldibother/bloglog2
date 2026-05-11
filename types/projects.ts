import { tagsType } from "./tags"
export type projectListType ={
    id: number, 
    title: string,
}
export type projectTable = {
    id: number,
    title: string,
    description?: string,
    creation?: string,
    lastUpdate?: string,
}
export interface projectVersionQuery {id: number, versionid: string, description?: string, projectid: number, creation?: string, notes: Array<projectNoteQuery>, tags: Array<tagsType>}
export interface projectNoteQuery {id: number, note: string, versionid: number}
export interface projectTodoQuery {id: number, todo: string, status: boolean, projectID:number}
export interface projectQuery  {id: number, title: string, description?: string};
export interface projectLinkQuery  {id: number, title: string, url: string, projectID: number}
export interface projectViewType extends projectQuery {
    links: Array<projectLinkQuery>,
    completedTodos: Array<projectTodoQuery>,
    pendingTodos: Array<projectTodoQuery>,
    versions: Array<projectVersionQuery>
}
