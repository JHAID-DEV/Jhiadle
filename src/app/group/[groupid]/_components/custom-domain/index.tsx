"use client"

import { FeatureGate } from "@/components/global/feature-gate"
import { Button } from "@/components/ui/button"

export const CustomDomainSettings = () => {
  return (
    <FeatureGate feature="customDomain">
      <div className="p-4">
        <h3>Custom Domain Settings</h3>
        <Button>Configure Domain</Button>
      </div>
    </FeatureGate>
  )
}
