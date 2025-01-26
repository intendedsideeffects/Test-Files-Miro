"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import type { D3ZoomEvent } from "d3-zoom"
import type { BaseType, Selection } from "d3-selection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ThreatData {
  name: string
  value: number
  children?: ThreatData[]
}

type HierarchyNode = d3.HierarchyCircularNode<ThreatData>

// Let's define our zoom event type more precisely
type ZoomEvent = D3ZoomEvent<SVGSVGElement, unknown>

export default function BirdThreats() {
  const svgRef = useRef<SVGSVGElement>(null)

  const data: ThreatData = {
    name: "Threats",
    value: 0,
    children: [
      {
        name: "Hunting",
        value: 529,
        children: [{ name: "Hunting", value: 529 }],
      },
      {
        name: "Invasive Species",
        value: 567,
        children: [
          { name: "Mammal", value: 362 },
          { name: "Bird", value: 88 },
          { name: "Plant", value: 83 },
          { name: "Fish", value: 13 },
          { name: "Reptile", value: 19 },
          { name: "Invertebrate", value: 51 },
          { name: "Pathogen", value: 75 },
          { name: "Problematic native species", value: 204 },
        ],
      },
      {
        name: "Human Disturbance",
        value: 178,
        children: [
          { name: "Recreational Activities", value: 95 },
          { name: "Work", value: 92 },
          { name: "War", value: 10 },
        ],
      },
      {
        name: "Fire",
        value: 281,
        children: [
          { name: "Increase in fire frequency/intensity", value: 191 },
          { name: "Suppression of fire frequency/intensity", value: 10 },
        ],
      },
      {
        name: "Water Management",
        value: 117,
        children: [{ name: "Water Management", value: 117 }],
      },
      {
        name: "Fisheries",
        value: 97,
        children: [{ name: "Fisheries", value: 97 }],
      },
      {
        name: "Agriculture",
        value: 1026,
        children: [
          { name: "Crops", value: 930 },
          { name: "Wood & pulp plantations", value: 170 },
          { name: "Aquaculture", value: 31 },
        ],
      },
      {
        name: "Climate Change",
        value: 479,
        children: [
          { name: "Habitat Shifting & Alteration", value: 341 },
          { name: "Storms & Flooding", value: 108 },
          { name: "Droughts", value: 78 },
          { name: "Temperature Extremes", value: 41 },
          { name: "Other Impacts", value: 20 },
        ],
      },
      {
        name: "Logging",
        value: 710,
        children: [
          { name: "Large scale", value: 271 },
          { name: "Subsistence/small scale", value: 575 },
        ],
      },
      {
        name: "Residential & Commercial",
        value: 374,
        children: [
          { name: "Housing & Urban Areas", value: 272 },
          { name: "Commercial & Industrial", value: 98 },
          { name: "Tourism & Recreation", value: 78 },
        ],
      },
      {
        name: "Transportation",
        value: 216,
        children: [
          { name: "Roads & Railroads", value: 174 },
          { name: "Utility & Service Lines", value: 51 },
          { name: "Shipping Lanes", value: 5 },
        ],
      },
      {
        name: "Energy & Mining",
        value: 249,
        children: [
          { name: "Mining & Quarrying", value: 197 },
          { name: "Oil & Gas Drilling", value: 26 },
          { name: "Renewable Energy", value: 31 },
        ],
      },
      {
        name: "Pollution",
        value: 222,
        children: [
          { name: "Agricultural & Forestry", value: 145 },
          { name: "Oil Spills & Industrial", value: 70 },
          { name: "Domestic & Urban Waste", value: 13 },
          { name: "Light Pollution", value: 13 },
          { name: "Garbage & Solid Waste", value: 20 },
          { name: "Air-borne Pollutants", value: 9 },
        ],
      },
    ],
  }

  useEffect(() => {
    if (!svgRef.current) return

    d3.select(svgRef.current).selectAll("*").remove()

    const width = 928
    const height = width

    const pack = d3.pack<ThreatData>().size([width, height]).padding(3)

    const root = pack(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => (b.value || 0) - (a.value || 0)),
    )

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .style("display", "block")
      .style("margin", "0 auto")
      .style("cursor", "pointer")
      .style("background", "#FFFFFF")

    let focus: HierarchyNode = root
    let view: [number, number, number] = [root.x, root.y, root.r * 2]

    const node = svg
      .append("g")
      .selectAll<SVGCircleElement, HierarchyNode>("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", "#FFFFFF")
      .attr("fill-opacity", 1)
      .attr("pointer-events", (d) => (!d.children ? "none" : null))
      .attr("stroke", (d) => (d.parent === root ? "#000000" : "#CCCCCC"))
      .attr("stroke-width", (d) => (d.parent === root ? 1.5 : 1))

    const label = svg
      .append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll<SVGGElement, HierarchyNode>("g")
      .data(root.descendants().slice(1))
      .join("g")
      .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
      .style("display", (d) => (d.parent === root ? "inline" : "none"))

    label.each(function (d) {
      const element = this as SVGGElement
      const g = d3.select(element)
      const percentage = Math.round(((d.value || 0) / (d.parent?.value || 1)) * 100)

      const getBaseFontSize = (r: number) => {
        if (r < 30) return Math.max(14, r / 3)
        if (r < 50) return r / 2.8
        return Math.min(r / 2.5, 28)
      }

      const fontSize = getBaseFontSize(d.r)

      if (d.children) {
        const words = d.data.name.split(/\s+/)
        const lineHeight = 1.2

        g.append("text")
          .attr("class", "parent-label")
          .style("font-size", `${fontSize}px`)
          .style("font-weight", "bold")
          .style("fill", "#000000")
          .selectAll("tspan")
          .data(words)
          .join("tspan")
          .attr("x", "0")
          .attr("y", (_, i) => `${(i - (words.length - 1) / 2) * lineHeight}em`)
          .text((d) => d)
      } else {
        const words = d.data.name.split(/\s+/)
        const lineHeight = 1.2

        g.append("text")
          .attr("class", "child-label")
          .style("font-size", `${fontSize}px`)
          .style("font-weight", "bold")
          .style("fill", "#000000")
          .selectAll("tspan")
          .data(words)
          .join("tspan")
          .attr("x", "0")
          .attr("y", (_, i) => `${(i - (words.length - 1) / 2) * lineHeight - 0.6}em`)
          .text((d) => d)

        g.append("text")
          .attr("class", "child-percentage")
          .attr("dy", `${words.length * lineHeight + 0.5}em`)
          .style("font-size", `${fontSize}px`)
          .style("fill", "#000000")
          .text(`${percentage}%`)
      }
    })

    function zoom(event: D3ZoomEvent<SVGSVGElement, unknown>, d: HierarchyNode) {
      focus = d

      const transition = svg
        .transition()
        .duration(750)
        .tween("zoom", () => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2])
          return (t: number) => zoomTo(i(t))
        })

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline"
        })
        .transition(transition as any)
        .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline"
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none"
        })

      node
        .attr("stroke", (d) => (d.parent === focus ? "#000000" : "#CCCCCC"))
        .attr("stroke-width", (d) => (d.parent === focus ? 1.5 : 1))
    }

    function zoomTo(v: [number, number, number]) {
      const k = width / v[2]
      view = v

      label.attr("transform", (d) => {
        const x = (d.x - v[0]) * k
        const y = (d.y - v[1]) * k
        return `translate(${x},${y})`
      })

      node.attr("transform", (d) => {
        const x = (d.x - v[0]) * k
        const y = (d.y - v[1]) * k
        return `translate(${x},${y})`
      })

      node.attr("r", (d) => d.r * k)
    }

    svg.on("click", (event: MouseEvent) => {
      const zoomEvent = {
        transform: d3.zoomIdentity,
        sourceEvent: event,
      } as ZoomEvent
      zoom(zoomEvent, root)
    })

    node.on("click", (event: MouseEvent, d: HierarchyNode) => {
      if (focus !== d) {
        event.stopPropagation()
        const zoomEvent = {
          transform: d3.zoomIdentity,
          sourceEvent: event,
        } as ZoomEvent
        zoom(zoomEvent, d)
      }
    })

    zoomTo([root.x, root.y, root.r * 2])
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Threats to Globally Threatened Bird Species</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "20px", background: "#FFFFFF" }}>
          <svg ref={svgRef}></svg>
        </div>
      </CardContent>
    </Card>
  )
}


























