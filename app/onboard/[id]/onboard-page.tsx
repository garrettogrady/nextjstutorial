import React, { ReactNode } from 'react';
import {KilnLogo} from "@/app/ui/KilnLogo";
import ProgressIndicator from "@/app/ui/components/progress-indicator";
import LogoHeader from "@/app/ui/components/logo-header";
import {useRouter} from "next/navigation";

interface OnboardPageProps {
    title: string;
    description: string;
    activeStep: number;
    totalSteps: number;
    buttonText: string;
    isProvisioning: boolean;
    onButtonClick: () => void;
    children?: ReactNode;
    showBackButton?: boolean;
}

const OnboardPage: React.FC<OnboardPageProps> = ({
                                                   title,
                                                   description,
                                                   activeStep,
                                                   totalSteps,
                                                   buttonText,
                                                   onButtonClick,
                                                    isProvisioning,
                                                   children,
                                                     showBackButton = true,
                                               }) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="relative h-16 flex items-center justify-center">
                <LogoHeader />
                {showBackButton && (
                    <button
                        onClick={handleBack}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-[#254442]"
                        aria-label="Go back"
                    >
                        <div className="pt-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                    </button>
                )}
            </div>
            <main className="flex-grow flex flex-col items-center justify-center p-4 mt-20">
                <h1 className="text-2xl font-bold text-center">{title}</h1>
                <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
                    {description}
                </p>
                {children}
                {isProvisioning && (
                    <div className="w-full max-w-xs mt-6 bg-white rounded-lg shadow-sm">
                        <input
                            type="text"
                            placeholder="4242 4242 4242 4242"
                            value="4242 4242 4242 4242"
                            className="w-full p-3 text-lg border-b border-gray-200 rounded-t-lg focus:outline-none"
                        />
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="08 / 21"
                                value="08 / 21"
                                className="w-1/2 p-3 text-lg border-r border-gray-200 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="812"
                                value="812"
                                className="w-1/2 p-3 text-lg focus:outline-none"
                            />
                        </div>
                    </div>
                )}
                <ProgressIndicator totalSteps={totalSteps} activeStep={activeStep} />
                <button
                    onClick={onButtonClick}
                    className="mt-8 w-full max-w-xs py-2 px-4 bg-[#254442] text-white rounded-md"
                >
                    {buttonText}
                </button>
            </main>
        </div>
    );
};

export default OnboardPage;