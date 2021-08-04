/**
 * Use the CSS tab above to style your Element's container.
 */
import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import {StripeCardElementOptions} from "@stripe/stripe-js";
import './Styles.css';

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

// Sample cards: https://stripe.com/docs/payments/accept-a-payment-synchronously?platform=web#web-test-integration
export const CardSection: React.FC = () => {
  return (
    <label>
      Card details
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  );
}
