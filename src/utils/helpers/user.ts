import { Shop, User, UserModel, Voucher } from '../types';
import { db } from '../../config/firebase.config';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    // console.log('user fired', id);
    if (id === '') {
      setUser(null);
      setShops([]);
      setVouchers([]);
      return;
    }

    db.collection('user')
      .doc(id)
      .onSnapshot({}, (userDocumentData) => {
        // unsubscribe()

        const user = userDocumentData.data() as User;

        if (!user) {
          setUser(null);
          setShops([]);
          setVouchers([]);
        } else {
          setUser(user);
        }
      });
  }, [id]);

  useEffect(() => {
    if (user == null) {
      return;
    }
    const unsubscribeArr: { (): void }[] = [];

    const { shops } = user;
    const shopsArr: Shop[] = [];
    shops.forEach((shopRef) => {
      const unSubShop = shopRef.onSnapshot({}, (shop) => {
        shopsArr.push(shop.data() as Shop);
      });
      unsubscribeArr.push(unSubShop);
    });
    setShops(shopsArr);

    const { vouchers } = user;
    const vouchersArr: Voucher[] = [];
    vouchers.forEach((voucherRef) => {
      const unsubVoucher = voucherRef.onSnapshot({}, (voucher) => {
        vouchersArr.push(voucher.data() as Voucher);
      });
      unsubscribeArr.push(unsubVoucher);
    });

    setVouchers(vouchersArr);

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
