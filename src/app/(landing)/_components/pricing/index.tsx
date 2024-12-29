import BackdropGradient from "@/components/global/backdrop-gradient"
import GradientText from "@/components/global/gradient-text"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Check } from "@/icons"
import { CheckoutButton } from "@/app/pricing/_components/checkout-button"
import { StripeElements } from "@/components/global/stripe/elements"

export const PricingSection = () => {
  return (
    <div className="w-full pt-20 flex flex-col items-center gap-3" id="pricing">
      <BackdropGradient className="w-8/12 h-full opacity-40 flex flex-col items-center">
        <GradientText
          className="text-4xl font-semibold text-center"
          element="H2"
        >
          Pricing Plans That Fit Your Right
        </GradientText>
        <p className="text-sm md:text-center text-left text-muted-foreground">
          Jhiadle is a dynamic online community platform that empowers
          individuals to connect, <br className="hidden md:block" />
          collaborate, and foster meaningful relationships.
        </p>
      </BackdropGradient>

      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {/* Free Tier */}
        <Card className="p-7 md:w-[300px] w-full bg-themeBlack border-themeGray">
          <div className="flex flex-col gap-2">
            <CardTitle>Free</CardTitle>
            <CardDescription className="text-[#B4B0AE]">
              Perfect for getting started
            </CardDescription>
            <div className="w-full mt-3">
              <CheckoutButton
                price="0"
                planType="free"
                onClick={() => {
                  window.location.href = "/signup"
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
            <p>Features</p>
            <span className="flex gap-2 mt-3 items-center">
              <Check />
              Basic group management
            </span>
            <span className="flex gap-2 items-center">
              <Check />
              Real-time messaging
            </span>
            <span className="flex gap-2 items-center">
              <Check />
              Content creating
            </span>
          </div>
        </Card>

        {/* Pro Tier */}
        <Card className="p-7 md:w-[300px] w-full bg-themeBlack border-themeGray relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1 rounded-full text-sm">
            Popular
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle>$99/m</CardTitle>
            <CardDescription className="text-[#B4B0AE]">
              For growing communities
            </CardDescription>
            <div className="w-full mt-3">
              <StripeElements>
                <CheckoutButton
                  price="99"
                  planType="pro"
                  onClick={() => {
                    window.location.href = "/signup"
                  }}
                />
              </StripeElements>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
            <p>Everything in Free, plus:</p>
            <span className="flex gap-2 mt-3 items-center">
              <Check />
              Advanced group management
            </span>
            <span className="flex gap-2 items-center">
              <Check />
              Custom domain
            </span>
            <span className="flex gap-2 items-center">
              <Check />
              Real-time messaging
            </span>
            <span className="flex gap-2 items-center">
              <Check />
              Content creating
            </span>
            <span className="flex gap-2 items-center">
              <Check />
              Explore features
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
