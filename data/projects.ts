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
export const tags:Array<tagType> =[
    {id: "001", color:"text-blue-500", title:"Initial Release"},
    {id: "002", color:"text-yellow-500", title:"On Hold"},
    {id: "003", color:"text-red-500", title:"Dropped"},
    {id:"004", color:"text-orange-500", title:"Work in Progress"},
    {id: "005", color:"text-green-500", title:"Latest"},
    {id: "006", color:"text-purple-500", title:"Prototype"}
]
export function getTag(id: string): tagType {
  return tags.find(tag => tag.id === id)!;
}
export const projects:Array<projectType> = [
    {
        title:"ESP32 Light System",
        links:[
            {
                name: "Github",
                link:"https://github.com/whyshouldibother/Esp32Rewrite",
            }
        ],
        tasks:{
            pending:["Add human detection (Reed + PIR)","SD card data editing.", "Revamp UI for scheduling.", "Serperate Power supply / external drive."],
            completed:["Relay Module.", "WiFi Inetgration.", "Over the WiFi Controls.", "Scheduled Opeations.", "OLED Stats Screen.", "SD Loading.", "Better Wiring Setup."]
        },
        versions:[
            {
               version:"1.0.0",
               tags: ["006"],
               description: "Initial project setup. Basic Interface for Controlling the lights was established.",
                points:["Used a relay module to control the lights.", "Implemented http endpoint for controlling the relay."],

            },
            {
                version:"2.0.0",
                tags:[],
                description:"Implemented an automatic scheduling system for the lights.",
                points:[],
                date: new Date(2026, 2, 5)
            }
        ]
    },{
        title:"ESP GIF SYSTEM",
        links:[],
        tasks:{
            pending:["Implement uploading gifs to system over WiFi.", "Implement reading gifs from SD card"],
            completed:["Load gifs as an array of bitmap images."]
        }, 
        versions:[],
    },{
        title:"ESP32 Automatic Ping Pong System",
        links:[],
        tasks:{
            pending:["Implement human controllable players.", "Implement score recording.",],
            completed:["Fully automatic Gameplay."]
        },
        versions:[],
    }
]

