import { useEffect, useState } from 'react';

import { Shop, User, UserModel, Voucher } from '../types';
import { db } from '../../config/firebase.config';

function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    if (id === '') {
      setUser(null);
      setShops([]);
      setVouchers([]);
      return;
    }

    const unsubscribe = db
      .collection('user')
      .doc(id)
      .onSnapshot({}, (userDocumentData) => {
        const user = userDocumentData.data() as User;

        if (!user) {
          setUser(null);
          setShops([]);
          setVouchers([]);
        } else {
          setUser(user);
        }
      });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (user == null) {
      return;
    }
    const unsubscribeArr: { (): void }[] = [];

    const { shops } = user;
    const shopsArr: Shop[] = [];
    for (const ref of shops) {
      const unSubShop = ref.onSnapshot((shop) => {
        shopsArr.push({ ...shop.data(), id: shop.id } as Shop);
        setShops([...shopsArr]);
      });
      unsubscribeArr.push(unSubShop);
    }

    const { vouchers } = user;
    const vouchersArr: Voucher[] = [];
    for (const ref of vouchers) {
      const unsubVoucher = ref.onSnapshot((voucher) => {
        const data = voucher.data();
        vouchersArr.push({
          ...data,
          id: voucher.id,
        } as Voucher);
        setVouchers([...vouchersArr]);
      });
      unsubscribeArr.push(unsubVoucher);
    }

    return () => {
      unsubscribeArr.forEach((unsubFunc) => unsubFunc());
    };
  }, [user]);

  return { ...user, shops, vouchers } as UserModel;
}

export {
  useUser,
  // register,
};
