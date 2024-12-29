import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { client } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case "customer.subscription.created":
        const subscription = event.data.object as Stripe.Subscription
        await client.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            planType: "pro",
            stripeSubscriptionId: subscription.id,
          },
        })
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription
        await client.user.update({
          where: {
            stripeSubscriptionId: deletedSubscription.id,
          },
          data: {
            planType: "free",
            stripeSubscriptionId: null,
          },
        })
        break

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription
        await client.user.update({
          where: {
            stripeSubscriptionId: updatedSubscription.id,
          },
          data: {
            planType: updatedSubscription.status === "active" ? "pro" : "free",
          },
        })
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Webhook Error", { status: 400 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
