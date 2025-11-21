import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Link from "next/link"

export function DashboardWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Account Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Account balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€145.81</div>
          <p className="text-sm text-muted-foreground mt-2">
            Your balance is positive; everything looks good. No action required.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link href="/invoices">Visit invoicing page</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-sm text-muted-foreground mt-2">
            You have 12 active services. Keep growing your infrastructure.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link href="/order">Order a new service</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Account VAT Percentage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Account VAT Percentage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center gap-2">
            🇺🇸 VAT 5%
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            The country United States of America is chosen as the account region.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link href="/account">Visit account page</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Business Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Business balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Locked
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Requires Business Account
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link href="/application">Visit Application Page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

