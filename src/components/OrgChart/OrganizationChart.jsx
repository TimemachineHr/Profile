import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { orgData } from "./orgData";

const OrganizationChart = () => {
  const svgRef = useRef(null);
  const [data, setData] = useState(orgData);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    svg.selectAll("*").remove();

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", "translate(50,50)");

    svg.call(
      d3.zoom().on("zoom", (event) => {
        g.attr("transform", event.transform);
      })
    );

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([width - 160, height - 160]);
    treeLayout(root);

    g.selectAll(".link")
      .data(root.links())
      .join("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "#ddd")
      .attr("stroke-width", 2);

    const nodes = g
      .selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node cursor-pointer")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .on("click", (event, d) => {
        d.data._children = d.data._children ? null : d.data.children;
        setData({ ...data });
      });

    nodes
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) => (d.data.highlight ? "#4ADE80" : "#007b5e"))
      .attr("stroke", "#333")
      .attr("stroke-width", 2)
      .classed("hover:bg-green-300 transition", true);

    nodes
      .append("text")
      .attr("dy", -30)
      .attr("text-anchor", "middle")
      .attr("class", "font-semibold text-gray-800 text-xs")
      .text((d) => d.data.name);

    nodes
      .append("text")
      .attr("dy", 40)
      .attr("text-anchor", "middle")
      .attr("class", "text-xs text-gray-500")
      .text((d) => d.data.title);

    nodes
      .append("text")
      .attr("dy", 55)
      .attr("text-anchor", "middle")
      .attr("class", "text-xs italic text-gray-400")
      .text((d) => d.data.role);
  }, [data]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <svg ref={svgRef} width="100%" height="100%" className="mx-auto"></svg>
    </div>
  );
};

export default OrganizationChart;
