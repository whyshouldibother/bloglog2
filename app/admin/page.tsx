import Layout from '@/app/(web)/layout'
import App from '@/app/(web)/page'
export default function Admin() {
    return (
        <div className="h-full w-full p-1 flex items-center justify-center">
        <div className="scale-[0.80] overflow-hidden">
            <Layout children={<App />} className="border"/>
        </div>
        </div>
    );
}
