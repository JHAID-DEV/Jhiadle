import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-06-20",
})

export async function POST(req: NextRequest) {
  try {
    const { paymentMethodId, priceId } = await req.json()

    // Create a customer
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email: "customer@example.com", // Get this from authenticated user
    })

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    })

    return NextResponse.json({ subscriptionId: subscription.id })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 },
    )
  }
}
