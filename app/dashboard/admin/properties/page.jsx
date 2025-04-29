'use client'
import { useState } from 'react'
import PropertiesTable from '@/components/dashboard/admin/PropertiesTable'
import { FiPlus, FiSearch, FiDownload } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    type: ''
  })

  const statusFilters = [
    { id: '', label: 'Tous', variant: 'outline' },
    { id: 'available', label: 'Disponible', variant: 'available' },
    { id: 'reserved', label: 'Réservé', variant: 'reserved' },
    { id: 'rented', label: 'Loué', variant: 'rented' },
    { id: 'sold', label: 'Vendu', variant: 'sold' }
  ]

  const typeFilters = [
    { id: '', label: 'Tous', variant: 'outline' },
    { id: 'apartment', label: 'Appartement', variant: 'apartment' },
    { id: 'house', label: 'Maison', variant: 'house' },
    { id: 'commercial', label: 'Commercial', variant: 'commercial' }
  ]

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des biens</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">Total: 42</Badge>
            <Badge variant="available">Dispo: 12</Badge>
            <Badge variant="reserved">Réservés: 5</Badge>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" size="sm" className="gap-2">
            <FiDownload size={16} />
            Exporter
          </Button>

          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
            <FiPlus size={16} />
            Ajouter
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Statut:</span>
          {statusFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant={filters.status === filter.id ? filter.variant : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => handleFilterChange('status', filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Type:</span>
          {typeFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant={filters.type === filter.id ? filter.variant : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => handleFilterChange('type', filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <PropertiesTable 
          searchQuery={searchQuery}
          filters={filters}
        />
        
        <div className="flex items-center justify-between p-3 border-t bg-gray-50">
          <span className="text-sm text-gray-600">1-10 sur 42 biens</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}