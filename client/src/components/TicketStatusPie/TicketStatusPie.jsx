import { PieChart, Pie, ResponsiveContainer } from "recharts";
import "./TicketStatusPie.scss";
function TicketStatusPie() {
  const dataOut = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const dataIn = [{ name: "GourpA", value: 400 }];

  return (
    <div>
      <ResponsiveContainer width={300} height={400} className="pie-container">
        <PieChart>
          <Pie
            data={dataIn}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={dataOut}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TicketStatusPie;
