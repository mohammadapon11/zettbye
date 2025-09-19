'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Building, 
  User as UserIcon 
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { User } from '@/types';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Advanced user details modal with smooth animations
 */
export function UserModal({ user, isOpen, onClose }: UserModalProps) {
  if (!user) return null;

  const contactItems = [
    { icon: Mail, label: 'Email', value: user.email, href: `mailto:${user.email}` },
    { icon: Phone, label: 'Phone', value: user.phone, href: `tel:${user.phone}` },
    { icon: Globe, label: 'Website', value: user.website, href: `https://${user.website}` },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details" size="lg">
      <div className="space-y-6">
        {/* User Header */}
        <motion.div
          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
        >
          <motion.div
            className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          >
            <UserIcon className="h-8 w-8 text-primary-600" />
          </motion.div>
          <div>
            <motion.h3
              className="text-xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {user.name}
            </motion.h3>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              @{user.username}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <h4 className="font-semibold text-gray-900">Contact Information</h4>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contactItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + (index * 0.1) }}
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Address
                </h4>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-sm text-gray-900">{user.address.street}, {user.address.suite}</p>
                  <p className="text-sm text-gray-600">{user.address.city}, {user.address.zipcode}</p>
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-500">
                    <p>Coordinates: {user.address.geo.lat}, {user.address.geo.lng}</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Company
              </h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <motion.h5
                  className="text-lg font-medium text-gray-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {user.company.name}
                </motion.h5>
                <motion.p
                  className="text-sm text-gray-600 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  &ldquo;{user.company.catchPhrase}&rdquo;
                </motion.p>
                <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  {user.company.bs}
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Modal>
  );
}
