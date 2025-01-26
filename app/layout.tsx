import "./globals.css"

export const metadata = {
  title: "Chart Visualizations",
  description: "Interactive chart examples using Next.js, Recharts, and D3",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">{children}</body>
    </html>
  )
}



