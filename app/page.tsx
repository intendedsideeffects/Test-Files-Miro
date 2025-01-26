import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Chart Examples</h1>
        <nav className="space-y-4">
          <Link
            href="/bar"
            className="block p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 hover:text-blue-800"
          >
            Bar Chart
          </Link>
          <Link
            href="/line"
            className="block p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 hover:text-blue-800"
          >
            Line Chart
          </Link>
          <Link
            href="/bird-threats"
            className="block p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 hover:text-blue-800"
          >
            Bird Threats Visualization
          </Link>
        </nav>
      </div>
    </main>
  )
}


