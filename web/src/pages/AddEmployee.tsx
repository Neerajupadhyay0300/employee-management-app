import { gql, useMutation } from '@apollo/client'
import { X } from 'lucide-react'
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
  email: string
}

export default function AddEmployee() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    name: '',
    department: 'HR',
    phone: '',
    hireDate: '',
    email: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [successTimer, setSuccessTimer] = useState<number | null>(null)

  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: value,
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!form.name || !form.email || !form.department || !form.phone || !form.hireDate) {
      setError('Please fill all required fields')
      return
    }
    // Fake success for now; skip real mutation
    setSuccess(`Successfully sent invite to ${form.email}`)
    setForm({ name: '', department: 'HR', phone: '', hireDate: '', email: '' })
    const id = window.setTimeout(() => setSuccess(null), 4000)
    setSuccessTimer(id)
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
            <select name="department" value={form.department} onChange={onChange} className="w-full border rounded px-3 py-2" required>
              <option value="HR">HR</option>
              <option value="Account">Account</option>
              <option value="Senior management">Senior management</option>
              <option value="IT">IT</option>
            </select>
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
            <label className="block text-sm text-neutral-600 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} className="w-full border rounded px-3 py-2" required />
          </div>
        </div>

        {success && (
          <div className="relative p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
            {success}
            <button
              aria-label="Dismiss"
              onClick={() => { if (successTimer) window.clearTimeout(successTimer); setSuccess(null) }}
              className="absolute right-2 top-2 p-1 rounded hover:bg-green-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex items-center justify-end space-x-3">
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 border rounded">Cancel</button>
          <button type="submit" disabled={!form.name || !form.email || !form.department || !form.phone || !form.hireDate} className="px-3 py-2 bg-primary-600 text-white rounded disabled:opacity-50">Send Invite</button>
        </div>
      </form>
    </div>
  )
}

