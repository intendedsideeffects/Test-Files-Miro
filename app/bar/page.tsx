"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 200 },
]

export default function BarChartPage() {
  return (
    <div className="h-screen w-full p-4">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

