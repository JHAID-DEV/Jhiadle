"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PricingSection } from "../(landing)/_components/pricing"
import { CheckoutButton } from "./_components/checkout-button"
import { StripeElements } from "@/components/global/stripe/elements"

export default function PricingPage() {
  return (
    <main className="container mx-auto py-20">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-5xl font-bold text-center">
          Simple, Transparent Pricing
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Choose the perfect plan for your community. All plans include a 14-day
          free trial. No credit card required to start.
        </p>
      </div>

      <div className="mt-20">
        <StripeElements>
          <PricingSection />
        </StripeElements>

        <div className="mt-6">
          <Link href="/signup" className="w-full mt-3">
            <Button
              variant="default"
              className="bg-[#333337] w-full rounded-2xl text-white hover:text-[#333337]"
            >
              Get Started
            </Button>
          </Link>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Start your 14-day free trial today!
          </p>
        </div>
      </div>
    </main>
  )
}
