import { firebaseFunctions } from '../../../config/firebase.config';

type CreateShopRequest = {
  name: string | undefined;
  tags?: string[] | undefined;
};

const createShopCallable = firebaseFunctions.httpsCallable('createShop');

export async function createShop(req: CreateShopRequest): Promise<boolean> {
  const { data } = await createShopCallable(req);

  return !!data.success as boolean;
}
