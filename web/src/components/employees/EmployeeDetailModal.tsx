// src/components/employees/EmployeeDetailModal.tsx
import React from 'react';
import { X, Mail, Phone, Building, Calendar, User, MapPin, FileText } from 'lucide-react';

interface EmployeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    id: number;
    name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    hireDate: string;
    status: string;
  };
}

export default function EmployeeDetailModal({ isOpen, onClose, employee }: EmployeeDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* 模态框容器 */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
          {/* 头部 */}
          <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Employee Details</h2>
              <p className="text-gray-600">Complete information for {employee.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* 内容 */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 左侧：基本信息 */}
              <div className="lg:w-1/3">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 mx-auto mb-6 flex items-center justify-center">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{employee.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{employee.role}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    employee.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : employee.status === 'remote'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                  </span>
                </div>

                {/* 快速操作 */}
                <div className="mt-6 space-y-3">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Edit Profile
                  </button>
                  <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>

              {/* 右侧：详细信息 */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-500" />
                      Personal Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <p className="font-medium">{employee.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Employee ID</label>
                        <p className="font-medium">#{employee.id.toString().padStart(4, '0')}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Hire Date</label>
                        <p className="font-medium flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {new Date(employee.hireDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-blue-500" />
                      Work Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600">Department</label>
                        <p className="font-medium flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-400" />
                          {employee.department}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <p className="font-medium">{employee.role}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Work Status</label>
                        <p className="font-medium">{employee.status === 'remote' ? 'Remote' : 'On-site'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 md:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-blue-500" />
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-gray-600">Email Address</label>
                        <p className="font-medium flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {employee.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Phone Number</label>
                        <p className="font-medium flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {employee.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 底部按钮 */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back to Directory
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Update Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}