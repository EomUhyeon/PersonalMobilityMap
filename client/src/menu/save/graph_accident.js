import React from "react";
import {
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

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>전국 개인형 이동장치 가해 사고 건수</h2>
            <LineChart
                width={600}
                height={300}
                data={formattedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="accident"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </div>
    );
}

export default GraphAccident;
