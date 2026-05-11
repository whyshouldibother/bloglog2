import type {Metadata} from "next";
import "./globals.css";
import {cn} from "@/lib/utils";
import localFont from 'next/font/local'
import {IBM_Plex_Mono} from 'next/font/google'
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-mono",
});
const virgil = localFont({
    src: '../public/fonts/Virgil.woff2',
    variable: "--font-virgil"
})
export const metadata: Metadata = {
    title: "ESP32 LOG",
    description: "My log",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full", ibmPlexMono.variable, virgil.variable)}
        >
            <body className={cn("bg-black text-white antialiased", ibmPlexMono.className)} style={{"--font-virgil": virgil.style.fontFamily} as React.CSSProperties}>
                {children}
            </body>
        </html>
    )
};
