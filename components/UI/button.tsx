"use client";
export default function Button({label, className, onClick, type="submit", disabled}:{label:string, className?:string, onClick?:()=>void, type:"submit"|"reset"|"button", disabled?:boolean}){
    return (
            <button className={`cursor-pointer bg-white text-black ${className}`} onClick={onClick} disabled={disabled} type={type}>{label}</button>
    )
}
