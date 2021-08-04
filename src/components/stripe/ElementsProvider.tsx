import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const STRIPE_TEST_API_KEY = "pk_test_CFpQszLbMJd6mXIFwRf0OBzi00ghEaNow3";
const STRIPE_API_KEY = process.env.STRIPE_API_KEY ?? STRIPE_TEST_API_KEY;
if (!STRIPE_API_KEY) {
  throw new Error(`Stripe API key must be present. Current: ${STRIPE_API_KEY}`);
}

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_API_KEY);

// To use Element components, wrap the root of your React app in an Elements provider.
export const ElementsProvider: React.FC = ({ children}) => {

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  )
}
