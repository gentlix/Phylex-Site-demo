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
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

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
        <h2 className="text-2xl font-semibold">Services</h2>
        <p className="text-sm text-muted-foreground">
          Overview of your active services, their status and monthly billing.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Q Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
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
        <Button variant="outline" onClick={clearFilters}>
          Clear
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>UUID</TableHead>
              <TableHead>Exp. Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Monthly pricing</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    {service.id}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{service.type}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{service.uuid}</TableCell>
                <TableCell>{service.expDate}</TableCell>
                <TableCell>
                  <Badge variant="outline">{service.status}</Badge>
                </TableCell>
                <TableCell>{service.monthlyPricing}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Renew
                    </Button>
                    <Button variant="outline" size="sm">
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
      <div className="flex items-center justify-between">
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
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
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
    </div>
  )
}

