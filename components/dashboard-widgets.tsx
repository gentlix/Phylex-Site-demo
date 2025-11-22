import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Link from "next/link"

export function DashboardWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Account Balance */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-foreground">Account balance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-2xl font-bold text-foreground">€145.81</div>
          <p className="text-sm text-muted-foreground">
            Your balance is positive; everything looks good. No action required.
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="link" className="p-0 h-auto text-sm text-foreground underline hover:no-underline" asChild>
            <Link href="/invoices">Visit invoicing page</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Services */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-foreground">Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-2xl font-bold text-foreground">12</div>
          <p className="text-sm text-muted-foreground">
            You have 12 active services. Keep growing your infrastructure.
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="link" className="p-0 h-auto text-sm text-foreground underline hover:no-underline" asChild>
            <Link href="/order">Order a new service</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Account VAT Percentage */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-foreground">Account VAT Percentage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-2xl font-bold flex items-center gap-2 text-foreground">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border/50">
              <span className="text-xs">🇺🇸</span>
            </div>
            VAT 5%
          </div>
          <p className="text-sm text-muted-foreground">
            The country United States of America is chosen as the account region.
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="link" className="p-0 h-auto text-sm text-foreground underline hover:no-underline" asChild>
            <Link href="/account">Visit account page</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Business Balance */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-foreground">Business balance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-2xl font-bold flex items-center gap-2 text-foreground">
            <Lock className="h-5 w-5" />
            Locked
          </div>
          <p className="text-sm text-muted-foreground">
            Requires Business Account
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="outline" className="h-auto px-4 py-2 text-sm text-foreground bg-card border-border hover:bg-accent" asChild>
            <Link href="/application">Visit Application Page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

