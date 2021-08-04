import { firebaseFunctions } from '../../../config/firebase.config';

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
