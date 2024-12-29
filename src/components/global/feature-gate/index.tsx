"use client"

import { useFeatureAccess } from "@/hooks/use-feature-access"
import { PLAN_FEATURES, PlanType } from "@/types/plans"
import { GlassModal } from "../glass-modal"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type FeatureGateProps = {
  children: React.ReactElement
  feature: keyof typeof PLAN_FEATURES.free
  userPlan?: PlanType
}

export const FeatureGate = ({
  children,
  feature,
  userPlan = "free",
}: FeatureGateProps) => {
  const { canAccess } = useFeatureAccess(userPlan)

  if (canAccess(feature)) {
    return children
  }

  return (
    <GlassModal
      trigger={<div>{children}</div>}
      title="Upgrade Required"
      description="This feature is only available on the Pro plan"
    >
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Upgrade to Pro to unlock this feature and many more benefits.
        </p>
        <Link href="/pricing">
          <Button className="w-full">Upgrade to Pro</Button>
        </Link>
      </div>
    </GlassModal>
  )
}
