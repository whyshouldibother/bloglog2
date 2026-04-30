import Sidebar from '@components/Sidebar'
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>){
    return(
        <div className={`h-screen flex flex-row w-full overflow-hidden`}>
            <div className="sm:1/4 lg:w-2/12 h-fill">
                <Sidebar/>
            </div>
            <div className="min-h-full lg:w-10/12 sm:3/4 overflow-y-auto scroll-smooth">
                {children}
            </div>
      </div>
    )
}
