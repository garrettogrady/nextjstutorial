import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {
    fetchInvoiceById,
    fetchCustomers,
    fetchPromotionById,
    fetchBusinessById,
    checkUserEnrollment
} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {Suspense} from "react";
import Footer from "@/app/ui/components/layout/footer";
import {PromotionDescription} from "@/app/ui/components/promotion/product-description";
import {Gallery} from "@/app/ui/components/promotion/gallery";
import {enrollUserInPromotion} from "@/app/lib/actions";
import { useFormState } from 'react-dom'
import {EnrollButton} from "@/app/ui/components/promotion/enrollment";

export const metadata: Metadata = {
    title: 'View Promotion',
};
const initialState = {
    message: '',
}
export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;
    const promotion = await fetchPromotionById(id);
    const business = await fetchBusinessById(promotion.businessId);

    const isUserEnrolled = await checkUserEnrollment(promotion.id);
    if (!promotion) {
        notFound();
    }
    return (
        <main>
            <div className="mx-auto max-w-screen-2xl px-4">
                <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
                    <div className="h-full w-full basis-full lg:basis-4/6">
                        <Gallery
                            images={promotion.images.map((image) => ({
                                src: image,
                                altText: "hello"
                            }))}
                        />
                    </div>

                    <div className="basis-full lg:basis-2/6">
                        <PromotionDescription promotion={promotion} business={business} />
                        <EnrollButton isUserEnrolled={isUserEnrolled} promotion={promotion}/>

                    </div>
                </div>
            </div>
        </main>
    );
}
