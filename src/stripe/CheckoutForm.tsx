import React, {useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import {CardSection} from './CardSection';
import {StripeCardElement, PaymentIntentResult, PaymentMethodResult} from "@stripe/stripe-js";

const BE_DOMAIN = "localhost:8080";
const BE_PAY_ENDPOINT = BE_DOMAIN + "/pay";

type CheckoutFormProps = {
  children?: React.ReactNode;
  // stripe-related fields
  voucherID: string;
  quantity: number;
  paymentMethodID: string;
};

// TODO temporary
type SuccessResponse = {
  success: true;
  requiresAction?: boolean | undefined;
  paymentIntentClientSecret?: string | undefined;
}

type ErrorResponse = {
  success: false;
  code: string;
  message: string;
  details?: unknown | undefined;
};

type APIResponse = SuccessResponse | ErrorResponse;

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ voucherID, quantity }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleStripeJsResult = (result: PaymentIntentResult) => {
    if (result.error) {
      setMessage("something went wrong.");
      setIsDisabled(false);
    } else {
      // the card action has been fulfilled
      // confirm the PaymentIntent again on the server
      fetch(BE_PAY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId: result.paymentIntent.id })
      })
        .then((confirmResult) => confirmResult.json())
        .then(handleServerResponse);
    }
  }

  const handleServerResponse = (res: APIResponse) => {
    if (res.success && res.requiresAction && res.paymentIntentClientSecret) {
      setIsDisabled(true);
      setMessage("loading...");
      stripe?.handleCardAction(
        res.paymentIntentClientSecret
      ).then(handleStripeJsResult);
    } else if (!res.success) {
      setMessage(res.message);
    } else {
      setMessage("payment success!");
      // TODO perform redirection or anything
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement: StripeCardElement | null = elements.getElement(CardElement);
    if (!cardElement) {
      throw new Error("stripe card element must be present");
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
      const errMsg = result.error.message ?? "something went wrong."
      console.error(result.error);
      setMessage(errMsg);
    } else {
      setMessage("");

      // Otherwise send paymentMethod.id to your server
      fetch(BE_PAY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voucherID: voucherID,
          quantity: quantity,
          paymentMethodId: result.paymentMethod.id,
        })
      }).then((result) => {
        // Handle server response (see Step 4)
        result.json().then((json) => handleServerResponse(json));
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={voucherID} disabled id="voucherID" name="voucherID" />
      <input type="text" value={quantity} disabled id="quantity" name="quantity" />
      <CardSection />
      <button type="submit" disabled={!stripe || isDisabled}>Submit Payment</button>
      <div>{message}</div>
    </form>
  );
}