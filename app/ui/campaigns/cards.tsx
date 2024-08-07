import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import {fetchCampaignBusinessCardData, fetchCampaignCardData, fetchCardData} from '@/app/lib/data';
import {fetchAuthedUserId} from "@/app/lib/actions";

const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export default async function CardWrapper() {
    const businessId = await fetchAuthedUserId();
    const {
        openEnrollmentsNumber,
        closedEnrollmentsNumber
    } = await fetchCampaignBusinessCardData(businessId);
    return (
        <>
            <Card title="Open" value={openEnrollmentsNumber} type="open" />
            <Card title="Closed"value={0} type="closed" />
            <Card title="Total Promotions" value={openEnrollmentsNumber} type="totalPromotions" />
        </>
    );
}

export function Card({
                         title,
                         value,
                         type,
                     }: {
    title: string;
    value: number | string;
    type: 'open' | 'closed' | 'totalPromotions' | 'totalBusinesses';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
