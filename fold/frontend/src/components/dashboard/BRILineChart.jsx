import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";

export default function BRILineChart({ data }) {
  return (
    <Card>
      <h3 className="mb-4 text-gray-400 text-sm">Burnout Trend</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" domain={[0,100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}