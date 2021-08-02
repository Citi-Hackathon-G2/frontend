type SuccessResponse = {
    success: true;
};

type ErrorResponse = {
    success: false;
    errMsg: string;
};

type APIResponse = SuccessResponse | ErrorResponse;

type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

type BuyRequest = {
    userId: string;
    shopId: string;
    // TODO: other stripe related stuff
};

type RedeemRequest = {
    voucherId: string;
};

type TransferRequest = {
    userId: string;
};

export type { APIResponse, SuccessResponse, ErrorResponse, RegisterRequest };
