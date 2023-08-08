import type { Metadata } from "next"
import { Header } from "./Components/Header"
import "./globals.css"

/**
 * 
 *
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export const metadata: Metadata = {
  title: "E-Shop!",
  description: "Simple Online Shop Application",
}

/**
 * 
 *
 * @author Aloento
 * @since 0.1.0
 * @version 0.1.0
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-mode="light">
        <Header />
        {children}
      </body>
    </html>
  )
}
