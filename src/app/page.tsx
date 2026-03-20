'use client';

import { useRole } from '@/context/RoleContext';
import BuyerView from '@/components/buyer/BuyerView';
import SellerView from '@/components/seller/SellerView';
import AdminView from '@/components/admin/AdminView';

export default function Home() {
  const { role } = useRole();

  return (
    <>
      {role === 'Buyer' && <BuyerView />}
      {role === 'Seller' && <SellerView />}
      {role === 'Admin' && <AdminView />}
    </>
  );
}
