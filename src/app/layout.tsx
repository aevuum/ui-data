import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {children}
    </StrictMode>,
  )
}