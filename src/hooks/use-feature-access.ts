"use client"

import { PLAN_FEATURES, PlanType } from "@/types/plans"

export const useFeatureAccess = (userPlan: PlanType = "free") => {
  const canAccess = (feature: keyof typeof PLAN_FEATURES.free) => {
    return PLAN_FEATURES[userPlan][feature]
  }

  return { canAccess }
}
