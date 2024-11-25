import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import AccidentData from './pm_accident.json';

function GraphAccident() {
    // 데이터 변환: accident 값을 숫자로 변환
    const formattedData = AccidentData.map(item => ({
        year: item.year,
        accident: parseInt(item.accident, 10)
    }));

    const customLegendFormatter = (value) => {
        if (value === "accident") return "전국 개인형 이동장치 가해 사고";
        return value;
      };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={formattedData}
                margin={{ top: 30, right: 30, left: 15, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend formatter={customLegendFormatter} />
                <Line
                    type="monotone"
                    dataKey="accident"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default GraphAccident;
