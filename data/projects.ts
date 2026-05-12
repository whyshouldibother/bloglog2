type linkType = {
    name:string;
    link: string;
}
type versionType = {
    version: string;
    tags: Array<string>;
    date?: Date;
    description:string;
    points:Array<string>;
    circuitDiagramLink?:string;
    flowchartDiagramLinks?:Array<string>
}
type projectType ={
    title: string;
    links: Array<linkType>;
    tasks:{
        pending: Array<string>;
        completed: Array<string>;
    }
    versions:Array<versionType>;
    open?: boolean;
};
type tagType={
    id: string; 
    color: string; 
    title: string;
}

