"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, MapPin } from "lucide-react"

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  condition: string
  enrolledPlan: string
  status: "Active" | "Inactive"
  joinDate: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      condition: "Weight Loss",
      enrolledPlan: "Weight Loss Transformation",
      status: "Active",
      joinDate: "2024-10-15",
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+1 (555) 234-5678",
      condition: "Diabetes",
      enrolledPlan: "Diabetes Management",
      status: "Active",
      joinDate: "2024-09-20",
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael@example.com",
      phone: "+1 (555) 345-6789",
      condition: "Muscle Gain",
      enrolledPlan: "Muscle Gain Program",
      status: "Active",
      joinDate: "2024-11-01",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 456-7890",
      condition: "Cancer Recovery",
      enrolledPlan: "Cancer Recovery Support",
      status: "Active",
      joinDate: "2024-08-10",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [patients, searchTerm])

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
        <p className="text-foreground/60 mt-1">View and manage enrolled patients</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
        <Input
          placeholder="Search patients by name, email, or condition..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="pl-10 bg-background border-border"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedPatients.map((patient) => (
          <Card key={patient.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{patient.name}</h3>
                  <p className="text-sm text-foreground/60">ID: {patient.id}</p>
                </div>
                <Badge
                  variant={patient.status === "Active" ? "default" : "secondary"}
                  className={patient.status === "Active" ? "bg-primary text-primary-foreground" : ""}
                >
                  {patient.status}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-foreground/70">
                  <Mail className="h-4 w-4" />
                  {patient.email}
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <Phone className="h-4 w-4" />
                  {patient.phone}
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <MapPin className="h-4 w-4" />
                  {patient.condition}
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-foreground/60 mb-1">Enrolled Plan</p>
                  <p className="font-medium text-foreground">{patient.enrolledPlan}</p>
                </div>
              </div>

              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {paginatedPatients.length === 0 && (
        <Card className="border-0 shadow-md">
          <div className="py-12 text-center">
            <p className="text-foreground/60">No patients found matching your search.</p>
          </div>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground/60">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-border"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-border"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
