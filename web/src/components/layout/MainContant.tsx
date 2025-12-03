import { useEffect, useMemo, useState } from 'react';
import { Grid3X3, LayoutGrid, MoreVertical, User, Mail, Building, Calendar, Search, Edit, Flag, Trash2 } from 'lucide-react';
import EmployeeDetailModal from '../employees/EmployeeDetailModal';

type Employee = {
  id: number;
  name: string;
  department: string;
  phone: string;
  hireDate: string;
  status: string;
  attendance: number;
  email: string;
  role: string;
};

export default function MainContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'tile'>('grid');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'role' | 'department' | 'attendance' | 'hireDate'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q)
    );
  }, [query, employees]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let av: any = a[sortKey];
      let bv: any = b[sortKey];
      if (sortKey === 'hireDate') {
        av = new Date(a.hireDate).getTime();
        bv = new Date(b.hireDate).getTime();
      }
      if (typeof av === 'string') {
        av = av.toLowerCase();
        bv = String(bv).toLowerCase();
      }
      const cmp = av > bv ? 1 : av < bv ? -1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const totalFiltered = sorted.length;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalFiltered);
  const paged = sorted.slice(start, end);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const resp = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query($page:Int,$pageSize:Int){ employees(page:$page,pageSize:$pageSize){ total employees{ id name department phone hireDate status attendance email role } } }`,
            variables: { page, pageSize },
          }),
        });
        const json = await resp.json();
        const payload = json.data.employees;
        setEmployees(payload.employees);
        setTotal(payload.total);
      } catch (e) {
        console.error('Failed to fetch employees', e);
      }
    };
    fetchEmployees();
  }, [page, pageSize]);


  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleEmployeeAction = (action: string, employeeId: number) => {
    console.log(`${action} employee ${employeeId}`);
  };

  return (
    <main className="flex-1 flex flex-col min-h-0 bg-[#F7F7FF]">
      <div className="flex-1 min-h-0 overflow-y-scroll overflow-x-hidden p-3 [scrollbar-gutter:stable_both-edges] max-w-full mx-auto">
        {viewMode === 'grid' ? (
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            {employees.length > 0 && (
              <div className="flex items-center justify-between px-6 py-3 border-b">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="search"
                    placeholder="Search employees"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-3 py-2 w-64 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm"
                  />
                </div>
                <div className="flex items-center bg-neutral-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors bg-primary-600 text-white shadow-sm`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    <span>Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('tile')}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors text-neutral-900 hover:text-primary-600 hover:bg-primary-50`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    <span>Tile</span>
                  </button>
                </div>
              </div>
            )}
            {employees.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <h3 className="text-lg font-semibold text-neutral-900">No employees</h3>
                <p className="mt-1 text-sm text-neutral-600">Add employees to see them here.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <h3 className="text-lg font-semibold text-neutral-900">No matches</h3>
                <p className="mt-1 text-sm text-neutral-600">Try adjusting your search.</p>
              </div>
            ) : (
            <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    {[
                      { key: 'name', label: 'Name' },
                      { key: 'role', label: 'Role' },
                      { key: 'department', label: 'Department' },
                      { key: 'email', label: 'Email' },
                      { key: 'phone', label: 'Phone' },
                      { key: 'hireDate', label: 'Hire Date' },
                      { key: 'attendance', label: 'Attendance' },
                      { key: 'status', label: 'Status' },
                    ].map((col) => (
                      <th
                        key={col.key}
                        className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer select-none"
                        onClick={() => {
                          if (['email','phone','status'].includes(col.key as string)) return;
                          setSortKey(col.key as any);
                          setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
                        }}
                      >
                        {col.label}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {paged.map((employee) => (
                    <tr 
                      key={employee.id} 
                      className="hover:bg-primary-50 cursor-pointer transition-colors"
                      onClick={() => handleEmployeeClick(employee)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-primary-600" />
                          </div>
                          <div>
                            <div className="font-medium text-neutral-900">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {employee.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {employee.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                        {employee.attendance}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          employee.status === 'active' 
                            ? 'bg-green-100 text-green-700'
                            : employee.status === 'remote'
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="relative">
                          <button 
                            className="p-1 hover:bg-neutral-100 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmployeeAction('menu', employee.id);
                            }}
                          >
                            <MoreVertical className="h-4 w-4 text-neutral-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t bg-neutral-50">
              <div className="text-sm text-neutral-600">Showing {start + 1}-{end} of {total}</div>
              <div className="flex items-center space-x-2">
                <select
                  value={pageSize}
                  onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)); }}
                  className="border border-neutral-300 rounded-md text-sm px-2 py-1"
                >
                  {[5,10,20,50].map(n => <option key={n} value={n}>{n}/page</option>)}
                </select>
                <button
                  className="px-3 py-1 rounded-md border border-neutral-300 text-sm disabled:opacity-50"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="px-3 py-1 rounded-md border border-neutral-300 text-sm disabled:opacity-50"
                  disabled={end >= totalFiltered}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
            </>
            )}
          </div>
        ) : (
          <>
          {employees.length > 0 && (
          <div className="flex items-center justify-between px-0 pb-3 min-w-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="search"
                placeholder="Search employees"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-3 py-2 w-64 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            <div className="flex items-center bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors text-neutral-900 hover:text-primary-600 hover:bg-primary-50`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('tile')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors bg-primary-600 text-white shadow-sm`}
              >
                <Grid3X3 className="h-4 w-4" />
                <span>Tile</span>
              </button>
            </div>
          </div>
          )}
          {employees.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-neutral-900">No employees</h3>
              <p className="mt-1 text-sm text-neutral-600">Add employees to see them here.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-neutral-900">No matches</h3>
              <p className="mt-1 text-sm text-neutral-600">Try adjusting your search.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((employee) => (
              <div 
                key={employee.id} 
                className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-5"
                onClick={() => handleEmployeeClick(employee)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{employee.name}</h3>
                      <p className="text-sm text-neutral-600">{employee.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      className="p-1 hover:bg-neutral-100 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === employee.id ? null : employee.id);
                      }}
                    >
                      <MoreVertical className="h-4 w-4 text-neutral-500" />
                    </button>
                    {menuOpenId === employee.id && (
                      <div className="absolute right-0 mt-2 w-36 rounded-md border border-neutral-200 bg-white shadow">
                        <button className="flex w-full items-center space-x-2 px-3 py-2 text-sm hover:bg-neutral-50" onClick={() => handleEmployeeAction('edit', employee.id)}>
                          <Edit className="h-4 w-4 text-neutral-600" />
                          <span>Edit</span>
                        </button>
                        <button className="flex w-full items-center space-x-2 px-3 py-2 text-sm hover:bg-neutral-50" onClick={() => handleEmployeeAction('flag', employee.id)}>
                          <Flag className="h-4 w-4 text-neutral-600" />
                          <span>Flag</span>
                        </button>
                        <button className="flex w-full items-center space-x-2 px-3 py-2 text-sm hover:bg-neutral-50" onClick={() => handleEmployeeAction('delete', employee.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                          <span className="text-red-600">Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-neutral-600">
                    <Building className="h-4 w-4 mr-2 text-neutral-400" />
                    <span>{employee.department}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <Mail className="h-4 w-4 mr-2 text-neutral-400" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                    <span>Joined {new Date(employee.hireDate).getFullYear()}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700`}>
                      {employee.role}
                    </span>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
          </>
        )}
      </div>

      {selectedEmployee && (
        <EmployeeDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          employee={selectedEmployee as any}
        />
      )}
      </main>
  );
}
