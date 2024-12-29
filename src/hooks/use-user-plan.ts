"use client"

import { PlanType } from "@/types/plans"
import { useQuery } from "@tanstack/react-query"

export const useUserPlan = (userId: string) => {
  const { data: userPlan } = useQuery({
    queryKey: ["user-plan", userId],
    queryFn: async () => {
      // Replace with your actual API call
      const response = await fetch(`/api/users/${userId}/plan`)
      const data = await response.json()
      return data.plan as PlanType
    },
  })

  return userPlan || "free"
}
