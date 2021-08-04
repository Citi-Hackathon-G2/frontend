import { firebaseFunctions } from '../../../config/firebase.config';
//const cors = require('cors')({ origin: true });


type CreateShopRequest = {
  name: string | undefined;
  tags?: string[] | undefined;
};

type CreateVoucherRequest = {
  title: string;
  description?: string | undefined;
  price: string;
  expireAt?: string | undefined;
  shopId: string;
};

const createShopCallable = firebaseFunctions.httpsCallable('createShop');
const createVoucherCallable = firebaseFunctions.httpsCallable('createVoucher');

export async function createShop(req: CreateShopRequest): Promise<boolean> {
  const { data } = await createShopCallable(req);

  return !!data.success as boolean;
}

export async function createVoucher(
  req: CreateVoucherRequest
): Promise<boolean> {
  const { data } = await createVoucherCallable(req);

  return !!data.success as boolean;
}




type RedeemRequest = {
  voucherId: string;
}
const redeemVoucherCallable = firebaseFunctions.httpsCallable('redeemVoucher');
export async function redeemVoucher(req: RedeemRequest): Promise<boolean> {
  const { data } = await redeemVoucherCallable(req);
  return !!data.success as boolean;
}
