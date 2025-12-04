import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($data: EmployeeInput!) {
    addEmployee(data: $data) {
      id
      name
      email
      department
      role
    }
  }
`

type FormState = {
  name: string
  department: string
  phone: string
  hireDate: string
  status: string
  attendance: number
  email: string
  password: string
  role: string
}

export default function AddEmployee() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    name: '',
    department: '',
    phone: '',
    hireDate: '',
    status: 'active',
    attendance: 100,
    email: '',
    password: '',
    role: 'employee',
  })
  const [error, setError] = useState<string | null>(null)

  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => navigate('/employees'),
    onError: (err) => setError(err.message),
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: name === 'attendance' ? Number(value) : value,
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name || !form.email || !form.password || !form.department || !form.phone || !form.hireDate) {
      setError('Please fill all required fields')
      return
    }
    await addEmployee({ variables: { data: form } })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Add Employee</h1>
      <form onSubmit={onSubmit} className="bg-white border rounded-lg p-4 space-y-4">
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Name</label>
            <input name="name" value={form.name} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Department</label>
            <input name="department" value={form.department} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Hire Date</label>
            <input type="date" name="hireDate" value={form.hireDate} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Status</label>
            <select name="status" value={form.status} onChange={onChange} className="w-full border rounded px-3 py-2">
              <option value="active">active</option>
              <option value="remote">remote</option>
              <option value="on_leave">on_leave</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Attendance (%)</label>
            <input type="number" min={0} max={100} name="attendance" value={form.attendance} onChange={onChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Role</label>
            <select name="role" value={form.role} onChange={onChange} className="w-full border rounded px-3 py-2">
              <option value="employee">employee</option>
              <option value="admin">admin</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 border rounded">Cancel</button>
          <button type="submit" disabled={loading} className="px-3 py-2 bg-primary-600 text-white rounded disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}

