"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 200 },
]

export default function LineChartPage() {
  return (
    <div className="h-screen w-full p-4">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

