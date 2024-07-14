/******************************************/
/******************************************/
/*** Read text file named Important.txt ***/
/******************************************/
/******************************************/

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TransactionGraph = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Aggregate transaction amounts by day
    const aggregateData = () => {
      const dataMap = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString(); // Convert date to string format
        const amount = transaction.amount;

        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += amount;

        return acc;
      }, {});

      // Transform dataMap into an array of objects with date and totalAmount
      const formattedData = Object.keys(dataMap).map((date) => ({
        date,
        totalAmountPerDay: dataMap[date],
      }));

      return formattedData;
    };

    // Update chartData state with aggregated data
    const data = aggregateData();
    setChartData(data);
  }, [transactions]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="totalAmountPerDay"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;
