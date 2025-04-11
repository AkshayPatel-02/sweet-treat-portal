
import React from "react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line 
} from "recharts";

interface ChartProps {
  data: any[];
  type?: "bar" | "line" | "pie";
  width?: number | string;
  height?: number | string;
  xKey?: string;
  yKey?: string;
  dataKey?: string;
  colorScheme?: string[];
  title?: string;
  className?: string;
}

// Default color scheme that matches the bakery theme
const defaultColors = ["#E57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB", "#64B5F6", "#4FC3F7"];

export function Chart({
  data,
  type = "bar",
  width = "100%",
  height = 300,
  xKey = "name",
  yKey = "value",
  dataKey = "value",
  colorScheme = defaultColors,
  title,
  className,
}: ChartProps) {
  const renderChart = () => {
    switch (type) {
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={dataKey}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colorScheme[index % colorScheme.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke={colorScheme[0]} activeDot={{ r: 8 }} />
          </LineChart>
        );
      case "bar":
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill={colorScheme[0]} />
          </BarChart>
        );
    }
  };

  return (
    <div className={className}>
      {title && <h3 className="font-medium mb-2">{title}</h3>}
      <ResponsiveContainer width={width} height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

// Donut chart specifically for showing percentages in a ring format
export function DonutChart({
  data,
  width = "100%",
  height = 300,
  dataKey = "value",
  colorScheme = defaultColors,
  title,
  className,
}: Omit<ChartProps, "type" | "xKey" | "yKey">) {
  return (
    <div className={className}>
      {title && <h3 className="font-medium mb-2">{title}</h3>}
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey={dataKey}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colorScheme[index % colorScheme.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
