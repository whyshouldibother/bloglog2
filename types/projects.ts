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
export interface projectQuery  {id: number, title: string, description?: string};
export interface projectLinkQuery  {id: number, title: string, url: string, projectID: number}
export interface projectViewType extends projectQuery {
    links: Array<projectLinkQuery>
}
