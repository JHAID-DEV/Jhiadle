export type PlanType = "free" | "pro"

export interface PlanFeatures {
  basicGroupManagement: boolean
  advancedGroupManagement: boolean
  realTimeMessaging: boolean
  contentCreating: boolean
  customDomain: boolean
  explore: boolean
}

export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  free: {
    basicGroupManagement: true,
    advancedGroupManagement: false,
    realTimeMessaging: true,
    contentCreating: true,
    customDomain: false,
    explore: false,
  },
  pro: {
    basicGroupManagement: true,
    advancedGroupManagement: true,
    realTimeMessaging: true,
    contentCreating: true,
    customDomain: true,
    explore: true,
  },
}
