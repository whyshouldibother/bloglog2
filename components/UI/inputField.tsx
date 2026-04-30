export default function InputField({label,type="text",...props}:{label:string, type:string}){
    return(
        <div className="flex flex-row gap-4">
            <label>{label}</label>
            <input className="border border-zinc-500 bg-zinc-900" type={type} {...props}></input>
        </div>
    )
}
