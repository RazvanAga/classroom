import type { Metadata } from "next"
import "./globals.css"
import Nav from "@/components/Nav"

export const metadata: Metadata = {
  title: "Clasa Mea",
  description: "Aplicație de gestionare a clasei",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50">
        <Nav />
        <main className="flex-1 container mx-auto max-w-6xl px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
