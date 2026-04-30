import Layout from '@/app/(web)/layout'
import App from '@/app/(web)/page'
export default function Admin() {
    return (
        <div className="h-screen w-full flex items-center justify-center md:pt-5 md:p-8">
            <div className="border scale-[0.80]"><Layout children={<App />} /></div>
        </div>
    );
}
