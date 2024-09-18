import KilnNavHeader from '@/app/ui/kiln-nav-header';
import { Metadata } from 'next';
import CreatorRegisterForm from "@/app/ui/creator-signup-form";

export const metadata: Metadata = {
    title: 'SignUp',
};

export default function SignUpPage() {
    return (
        <main className="flex items-center justify-center">
            <div className="relative mx-auto flex w-full max-w-[1000px] flex-col space-y-2.5 p-4">
                <div className="flex h-20 w-full items-end bg-[#254442] p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <KilnNavHeader />
                    </div>
                </div>
                <CreatorRegisterForm />
            </div>
        </main>
    );
}