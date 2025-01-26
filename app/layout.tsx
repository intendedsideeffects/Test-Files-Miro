import "./globals.css"

export const metadata = {
  title: "Chart Test",
  description: "A collection of chart examples using Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}














