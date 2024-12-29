"use client"

import { useAuth } from "@clerk/nextjs"
import { GlassModal } from "@/components/global/glass-modal"
import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

type CheckoutButtonProps = {
  price: string
  planType: "free" | "pro"
  onClick: () => void
}

export const CheckoutButton = ({
  price,
  planType,
  onClick,
}: CheckoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleCheckout = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe not initialized")
      return
    }

    setIsLoading(true)

    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
      })

      if (!paymentMethod) {
        throw new Error("Failed to create payment method")
      }

      // Call your backend API
      const response = await fetch("/api/stripe/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          priceId: price,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      // Handle successful subscription
      toast.success("Subscription created successfully!")
      window.location.href = "/Group:data.group.id"
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed")
    } finally {
      setIsLoading(false)
    }
  }

  if (price === "0") {
    return (
      <Button onClick={onClick} className="w-full" variant="default">
        Start Free Trial
      </Button>
    )
  }

  return (
    <GlassModal
      trigger={
        <Button className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90">
          Start Pro Plan
        </Button>
      }
      title="Complete your purchase"
      description={`Subscribe to Pro Plan for $${price}/month`}
    >
      <div className="flex flex-col gap-5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#B4B0AE",
                "::placeholder": {
                  color: "#B4B0AE",
                },
              },
            },
          }}
          className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
        />
        <Button onClick={handleCheckout} className="w-full">
          <Loader loading={isLoading}>Pay ${price}/month</Loader>
        </Button>
      </div>
    </GlassModal>
  )
}
