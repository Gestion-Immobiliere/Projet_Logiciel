'use client';
import { useState, useRef, useEffect } from 'react';
import UsersTable from '@/components/dashboard/admin/UsersTable';
import { FiPlus, FiSearch, FiFilter, FiChevronDown, FiX, FiDownload } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles = [
    { value: '', label: 'Tous les rôles' },
    { value: 'admin', label: 'Administrateurs' },
    { value: 'user', label: 'Utilisateurs' }
  ];

  const statuses = [
    { value: '', label: 'Tous statuts' },
    { value: 'active', label: 'Actifs' },
    { value: 'pending', label: 'En attente' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-sm text-gray-500 mt-1">
            24 utilisateurs • 5 administrateurs • 3 en attente
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher utilisateur..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>

          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <FiFilter />
            <span>Filtres</span>
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <FiDownload />
            <span>Exporter</span>
          </Button>

          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <FiPlus />
            <span>Ajouter</span>
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <div 
          ref={filterRef}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setRoleFilter('');
                  setStatusFilter('');
                }}
                className="w-full"
              >
                Réinitialiser
              </Button>
              <Button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Appliquer
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <UsersTable 
          filters={{ searchQuery, roleFilter, statusFilter }} 
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Affichage des utilisateurs 1-10 sur 24
          </p>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" disabled>
              Précédent
            </Button>
            <Button variant="outline">
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}