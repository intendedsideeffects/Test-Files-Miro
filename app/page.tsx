import Link from "next/link"

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Chart Test Pages</h1>
      <div className="space-y-4">
        <Link href="/bar" className="text-blue-500 hover:underline block">
          Bar Chart
        </Link>
        <Link href="/line" className="text-blue-500 hover:underline block">
          Line Chart
        </Link>
      </div>
    </main>
  )
}

