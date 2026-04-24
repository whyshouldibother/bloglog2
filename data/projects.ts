const data = [
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
               version:"1.0.0"
            },
            {
                version:"2.0.0"
            }
        ]
    },{
        title:"ESP GIF SYSTEM",
        links:[],
        tasks:{
            pending:["Implement uploading gifs to system over WiFi.", "Implement reading gifs from SD card"],
            completed:["Load gifs as an array of bitmap images."]
        }
    },{
        title:"ESP32 Automatic Ping Pong System",
        links:[],
        tasks:{
            pending:["Implement human controllable players.", "Implement score recording.",],
            completed:["Fully automatic Gameplay."]
        }
    }
]

export default data;
