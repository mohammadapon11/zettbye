'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, AlertCircle, Mail, Building } from 'lucide-react';
import { UserModal } from '@/components/users/UserModal';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorBoundary';
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { API_ENDPOINTS } from '@/lib/constants';
import { User } from '@/types';
import { cn } from '@/utils/cn';

/**
 * Users page with responsive table and animated modal
 */
export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [simulateError, setSimulateError] = useState(false);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const { 
    data: users, 
    loading, 
    error, 
    retry 
  } = useFetch<User[]>(simulateError ? API_ENDPOINTS.INVALID : API_ENDPOINTS.USERS);

  const filteredUsers = users?.filter(user =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    user.company.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || [];

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleSimulateError = () => {
    setSimulateError(true);
  };

  const handleRetry = () => {
    setSimulateError(false);
    retry();
  };

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={handleRetry}
        title="Failed to load users"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">
            Manage and view user information ({filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'})
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleSimulateError}
            variant="outline"
            size="sm"
            icon={<AlertCircle className="h-4 w-4" />}
          >
            Test Error
          </Button>
          <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        className="relative max-w-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </motion.div>

      {/* Loading State */}
      {loading && <LoadingSpinner size="lg" text="Loading users..." />}

      {/* Users Table */}
      {!loading && filteredUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Name</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Email</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Company</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-900">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleUserClick(user)}
                        initial={{ opacity: 0, x: -20, rotateX: -10 }}
                        animate={{ opacity: 1, x: 0, rotateX: 0 }}
                        transition={{ 
                          delay: index * 0.08,
                          type: 'spring',
                          stiffness: 300,
                          damping: 25
                        }}
                        whileHover={{ 
                          backgroundColor: '#f9fafb',
                          scale: 1.01,
                          rotateX: 2,
                          transition: { duration: 0.2 }
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{user.email}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{user.company.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-900">{user.phone}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 p-4">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    className={cn(
                      'p-4 rounded-lg border border-gray-200 cursor-pointer',
                      'hover:bg-gray-50 transition-colors'
                    )}
                    onClick={() => handleUserClick(user)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <span className="text-sm text-gray-500">@{user.username}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Building className="h-3 w-3" />
                        <span>{user.company.name}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* No Results */}
      {!loading && filteredUsers.length === 0 && users && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-gray-500 mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No users found</h3>
            <p className="text-sm">Try adjusting your search query</p>
          </div>
          {searchQuery && (
            <Button
              onClick={() => setSearchQuery('')}
              variant="outline"
              size="sm"
            >
              Clear Search
            </Button>
          )}
        </motion.div>
      )}

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}
