import React from "react"
import { StudioSidebar } from "@/components/studio/sidebar"
import { StudioHeader } from "@/components/studio/header"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <StudioSidebar />
      <div className="flex-1 flex flex-col">
        <StudioHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
