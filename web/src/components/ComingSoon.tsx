import { CheckCircle, X } from 'lucide-react'
import { useComingSoon } from '../context/comingSoon'

export default function ComingSoon() {
  const { open, close } = useComingSoon()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-neutral-200 w-[92%] max-w-md p-6 animate-fade-in">
        <button className="absolute right-3 top-3 p-2 rounded hover:bg-neutral-100" onClick={close}>
          <X className="h-4 w-4 text-neutral-600" />
        </button>
        <div className="flex items-center space-x-3 mb-3">
          <CheckCircle className="h-6 w-6 text-primary-600" />
          <h2 className="text-lg font-semibold">Feature Coming Soon</h2>
        </div>
        <p className="text-sm text-neutral-700">
          This feature is under active development. Sit tight — it will be available shortly.
        </p>
        <div className="mt-6 flex justify-end">
          <button onClick={close} className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 shadow">Okay</button>
        </div>
      </div>
    </div>
  )
}

