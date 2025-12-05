import { createContext, useContext, useState } from 'react'

type Ctx = { open: boolean; openModal: () => void; close: () => void }
const ComingSoonCtx = createContext<Ctx>({ open: false, openModal: () => {}, close: () => {} })

export function ComingSoonProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const close = () => setOpen(false)
  return <ComingSoonCtx.Provider value={{ open, openModal, close }}>{children}</ComingSoonCtx.Provider>
}

export function useComingSoon() {
  return useContext(ComingSoonCtx)
}

