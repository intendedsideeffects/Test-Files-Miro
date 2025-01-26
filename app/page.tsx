import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Chart Test Pages</h1>
        <div className="space-y-4 flex flex-col">
          <Link
            href="/bar"
            className="text-blue-600 hover:text-blue-800 hover:underline block py-2 px-4 rounded transition duration-150 ease-in-out bg-blue-50 hover:bg-blue-100"
          >
            Bar Chart
          </Link>
          <Link
            href="/line"
            className="text-blue-600 hover:text-blue-800 hover:underline block py-2 px-4 rounded transition duration-150 ease-in-out bg-blue-50 hover:bg-blue-100"
          >
            Line Chart
          </Link>
          <Link
            href="/bird-threats"
            className="text-blue-600 hover:text-blue-800 hover:underline block py-2 px-4 rounded transition duration-150 ease-in-out bg-blue-50 hover:bg-blue-100"
          >
            Bird Threats Visualization
          </Link>
        </div>
      </div>
    </main>
  )
}







