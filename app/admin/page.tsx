import Layout from '@/app/(web)/layout'
import App from '@/app/(web)/page'
export default function Admin() {
    return (
        <div className="flex flex-1 justify-center items-center md:pt-5 p-0 overflow-hidden">
        <div className=" scale-[0.9] border border-zinc-500 overflow-hidden w-full">
            <Layout><App/></Layout>
        </div>
        </div>
    );
}
