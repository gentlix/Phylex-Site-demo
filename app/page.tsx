import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { DashboardWidgets } from "@/components/dashboard-widgets"
import { ServicesTable } from "@/components/services-table"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <DashboardWidgets />
            <ServicesTable />
          </div>
        </main>
      </div>
    </div>
  )
}

