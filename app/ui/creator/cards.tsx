import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper({id}: { id: string }) {
  const {
      numberOfEnrollments,
      numberOfRedemptions,
      totalEnrolledPromotions,
      totalBusiness,
  } = await fetchCardData(id);
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}
      <Card title="Enrolled" value={numberOfEnrollments} type="enrolled" />
      <Card title="Redeemed" value={numberOfRedemptions} type="redeemed" />
      <Card title="Total Spent" value={totalEnrolledPromotions} type="totalPromotions" />
      <Card title="Total Businesses Visited" value={totalBusiness} type="totalBusinesses"
      />
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
  type: 'redeemed' | 'enrolled' | 'totalPromotions' | 'totalBusinesses';
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
