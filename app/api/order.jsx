import { loadStripe } from "@stripe/stripe-js";

export const checkout = async (lineItems) => {
  let stripePromise = null;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();
  console.log(lineItems);

  // stripe.createPaymentMethod({
  //   type: "card",
  //   card: cardElement,
  // });

  await stripe.redirectToCheckout({
    // payment_method_types: ["card", "blik", "p24"],
    mode: "payment",
    lineItems,
    successUrl: "http://localhost:3000/success",
  });
};
