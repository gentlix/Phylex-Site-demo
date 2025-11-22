"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"

interface Service {
  id: number
  name: string
  type: string
  uuid: string
  expDate: string
  status: string
  monthlyPricing: string
}

const services: Service[] = [
  {
    id: 20,
    name: "Basic111",
    type: "KVM",
    uuid: "#2820032168e5b00f0e8426b0bf0971eb",
    expDate: "01/01/1",
    status: "Active",
    monthlyPricing: "€9.99",
  },
  {
    id: 19,
    name: "Basic111",
    type: "KVM",
    uuid: "#a78ec92b7cc49ba8d74945eb3e183327",
    expDate: "01/01/1",
    status: "Active",
    monthlyPricing: "€21.49",
  },
  {
    id: 18,
    name: "Pro",
    type: "KVM",
    uuid: "#bf0c475b8928e1fcf80fa2fc8c8804d0",
    expDate: "12/02/2026",
    status: "Active",
    monthlyPricing: "€19.99",
  },
  {
    id: 17,
    name: "Enterprise",
    type: "Game",
    uuid: "#5f973b0bea993cf219a89c2452b7de31",
    expDate: "09/02/2027",
    status: "Active",
    monthlyPricing: "€49.99",
  },
  {
    id: 16,
    name: "Enterprise",
    type: "Game",
    uuid: "#f847101874f1e4d141899dd12b1a1999",
    expDate: "09/12/2025",
    status: "Active",
    monthlyPricing: "€49.99",
  },
]

export function ServicesTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [idFilter, setIdFilter] = useState("")

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.uuid.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || service.type === typeFilter
    const matchesStatus = statusFilter === "all" || service.status === statusFilter
    const matchesId = !idFilter || service.id.toString().includes(idFilter)
    return matchesSearch && matchesType && matchesStatus && matchesId
  })

  const totalPages = Math.ceil(filteredServices.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedServices = filteredServices.slice(startIndex, endIndex)

  const uniqueTypes = Array.from(new Set(services.map(s => s.type)))
  const uniqueStatuses = Array.from(new Set(services.map(s => s.status)))

  const clearFilters = () => {
    setSearchQuery("")
    setTypeFilter("all")
    setStatusFilter("all")
    setIdFilter("")
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Services</h2>
        <p className="text-sm text-muted-foreground">
          Overview of your active services, their status and monthly billing.
        </p>
      </div>

      {/* Services Card */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative max-w-xs flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Q Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="ID"
              value={idFilter}
              onChange={(e) => setIdFilter(e.target.value)}
              className="w-[120px]"
            />
            <div className="ml-auto">
              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-medium text-foreground">ID</TableHead>
                  <TableHead className="font-medium text-foreground">Name</TableHead>
                  <TableHead className="font-medium text-foreground">Type</TableHead>
                  <TableHead className="font-medium text-foreground">UUID</TableHead>
                  <TableHead className="font-medium text-foreground">Exp. Date</TableHead>
                  <TableHead className="font-medium text-foreground">Status</TableHead>
                  <TableHead className="font-medium text-foreground">Monthly pricing</TableHead>
                  <TableHead className="text-right font-medium text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedServices.map((service) => (
                  <TableRow key={service.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#4CAF50]" />
                        <span className="text-foreground">{service.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{service.name}</TableCell>
                    <TableCell>
                      <Button variant="secondary" size="sm" className="h-7 text-xs text-foreground">
                        {service.type}
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{service.uuid}</TableCell>
                    <TableCell className="text-foreground">{service.expDate}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-7 text-xs text-foreground">
                        {service.status}
                      </Button>
                    </TableCell>
                    <TableCell className="text-foreground">{service.monthlyPricing}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-foreground">
                          Renew
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-foreground">
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

