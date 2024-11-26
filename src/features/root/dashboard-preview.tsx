"use client";

import { Card } from "@/components/ui/card";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const signupData = [
  { month: "1/2023", superuser: 200, nonPremium: 150 },
  { month: "2/2023", superuser: 250, nonPremium: 200 },
  { month: "3/2023", superuser: 300, nonPremium: 180 },
  { month: "4/2023", superuser: 400, nonPremium: 220 },
];

const revenueData = [
  { city: "Toronto", value: 1432 },
  { city: "Vancouver", value: 1187 },
  { city: "Montreal", value: 987 },
  { city: "Ottawa", value: 724 },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

const customerData = [
  {
    id: "186332",
    dateJoined: "01/31/2023",
    city: "Vancouver",
    totalSpending: "$1531.30",
    totalOrders: "92",
  },
  {
    id: "106231",
    dateJoined: "12/08/2021",
    city: "Toronto",
    totalSpending: "$1101.46",
    totalOrders: "84",
  },
];

export function DashboardPreview() {
  return (
    <div className="space-y-4 rounded-xl bg-sidebar p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card className="bg-sidebar p-4">
          <h3 className="mb-4 text-sm font-medium">User signups</h3>
          <LineChart width={300} height={200} data={signupData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="superuser" stroke="#FF6B6B" />
            <Line type="monotone" dataKey="nonPremium" stroke="#4ECDC4" />
          </LineChart>
        </Card>

        <Card className="bg-sidebar p-4">
          <h3 className="mb-4 text-sm font-medium">Revenue by city</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={revenueData}
              cx={150}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {revenueData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>

        <Card className="bg-sidebar p-4">
          <h3 className="mb-4 text-sm font-medium">Customer spending</h3>
          <div className="space-y-2">
            <div className="text-4xl font-bold">$201.53</div>
            <div className="text-sm text-green-500">↑ 20.5%</div>
          </div>
        </Card>
      </div>

      <Card className="col-span-full w-full flex-1 bg-sidebar p-4">
        <h3 className="mb-4 text-sm font-medium">Top customers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2">ID</th>
                <th className="pb-2">Date joined</th>
                <th className="pb-2">City</th>
                <th className="pb-2">Total spending</th>
                <th className="pb-2">Total orders</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer) => (
                <tr key={customer.id}>
                  <td className="py-2">{customer.id}</td>
                  <td>{customer.dateJoined}</td>
                  <td>{customer.city}</td>
                  <td>{customer.totalSpending}</td>
                  <td>{customer.totalOrders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
