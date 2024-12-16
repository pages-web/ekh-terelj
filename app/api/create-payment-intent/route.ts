import { NextRequest, NextResponse } from "next/server";
import { queries } from "@/sdk/graphql/payments";
import { getClient } from "@/sdk/ssClient";
export async function POST(request: NextRequest) {
  try {
    const { data: paymentsData } = await getClient().query({
      query: queries.payments,
      context: {
        headers: {
          "erxes-app-token": process.env.NEXT_ERXES_APP_TOKEN,
          "Cache-Control": "no-cache",
        },
      },
    });

    const stripeData = paymentsData?.payments?.find(
      (payment: any) => payment.kind === "stripe"
    );

    if (!stripeData) {
      return NextResponse.json(
        { error: "Stripe configuration not found" },
        { status: 404 }
      );
    }

    const { amount } = await request.json();

    const stripe = require("stripe")(stripeData.config.secretKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // or your desired currency
      payment_method_types: ["card"],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
