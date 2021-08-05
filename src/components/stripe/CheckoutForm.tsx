import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import { CardSection } from './CardSection';
import { StripeCardElement, PaymentIntentResult } from '@stripe/stripe-js';
import { firebaseFunctions } from '../../config/firebase.config';
import { Button, Input } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { Form } from 'antd';

type CheckoutFormProps = {
  children?: React.ReactNode;
  // stripe-related fields
  voucherId: string;
  quantity: number;
  formProp: FormInstance<any>;
};

// TODO temporary
type BuyRequest = {
  voucherId?: string | undefined;
  quantity?: number | undefined;
  paymentMethodId?: string | undefined;
  paymentIntentId?: string | undefined;
  // currency?: string; // three-letter ISO code https://stripe.com/docs/currencies
};

type SuccessResponse = {
  success: true;
  requiresAction?: boolean | undefined;
  paymentIntentClientSecret?: string | undefined;
};

type ErrorResponse = {
  code: string;
  message: string;
  details?: unknown | undefined;
};

type APIResponse = SuccessResponse | ErrorResponse;

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  voucherId,
  quantity,
  formProp,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const buyVoucher = firebaseFunctions.httpsCallable('buyVoucher');

  const handleSubmit = async ({ quantity }: { quantity: number }) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement: StripeCardElement | null =
      elements.getElement(CardElement);
    if (!cardElement) {
      throw new Error('stripe card element must be present');
    }

    // convert information collected by Elements into actual payment data
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        // Include any additional collected billing details.
        // https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
      },
    });

    if (result.error) {
      // Show error in payment form
      const errMsg = result.error.message ?? 'something went wrong.';
      console.error(result.error);
      setMessage(errMsg);
    } else {
      setMessage('');

      // Otherwise send paymentMethod.id to your server
      console.log(voucherId);
      const req: BuyRequest = {
        voucherId: voucherId,
        quantity: quantity,
        paymentMethodId: result.paymentMethod.id,
        paymentIntentId: undefined,
      };
      buyVoucher(req)
        .then((res) => {
          console.log(res);
          handleServerResponse(res.data);
        })
        .catch((err: ErrorResponse) => {
          console.error(err);
          setMessage(err.message);
        });
    }
  };

  const handleServerResponse = (res: SuccessResponse) => {
    if (res.success && res.requiresAction && res.paymentIntentClientSecret) {
      setIsDisabled(true);
      setMessage('loading...');
      stripe
        ?.handleCardAction(res.paymentIntentClientSecret)
        .then(handleStripeJsResult);
    } else {
      setMessage('payment success!');
      // TODO perform redirection or anything
    }
  };

  const handleStripeJsResult = (result: PaymentIntentResult) => {
    if (result.error) {
      setMessage('something went wrong.');
      setIsDisabled(false);
    } else {
      // the card action has been fulfilled
      // confirm the PaymentIntent again on the server
      buyVoucher({
        voucherId: voucherId,
        quantity: quantity,
        paymentIntentId: result.paymentIntent.id,
      })
        .then((res) => {
          console.log(res);
          handleServerResponse(res.data);
        })
        .catch((err: ErrorResponse) => {
          console.error(err);
          setMessage(err.message);
        });
    }
  };

  return (
    <Form form={formProp} onFinish={handleSubmit}>
      <Input
        type="text"
        value={voucherId}
        disabled
        id="voucherID"
        name="voucherID"
      />
      <div style={{ marginTop: '0.5rem' }}>
        <Form.Item
          initialValue={quantity}
          name="quantity"
          label="Quantity"
          rules={[{ required: true }]}
        >
          <Input type="text" value={quantity} id="quantity" />
        </Form.Item>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <CardSection />
      </div>
      {/* <Button
        style={{ marginTop: '0.5rem' }}
        htmlType="submit"
        disabled={!stripe || isDisabled}
      >
        Submit Payment
      </Button> */}
      <div>{message}</div>
    </Form>
  );
};
