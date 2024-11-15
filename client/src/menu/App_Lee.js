import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useTable } from 'react-table';

function App() {
  const [violationData, setViolationData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    // CSV 파일을 로드하여 데이터 설정
    axios.get('/assets/cctv_violation_data_with_weather_test.csv')
      .then(response => {
        const data = csvToJson(response.data);
        setViolationData(data);
      });

    axios.get('/assets/cctv_violation_forecast.csv')
      .then(response => {
        const data = csvToJson(response.data);
        setForecastData(data);
      });
  }, []);

  // CSV 데이터를 JSON으로 변환하는 함수
  const csvToJson = (csv) => {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  };

  const columns = React.useMemo(
    () => [
      { Header: '날짜', accessor: '날짜' },
      { Header: 'CCTV 위치', accessor: 'CCTV 위치' },
      { Header: '위반 종류', accessor: '위반 종류' },
      { Header: '위반 건수', accessor: '위반 건수' },
      { Header: '날씨', accessor: '날씨' },
      { Header: '기온(°C)', accessor: '기온(°C)' },
      { Header: '교통량(대수)', accessor: '교통량(대수)' }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: violationData });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>CCTV 위반 데이터</h1>
      <p style={{ textAlign: 'center' }}>
        아래 표는 CCTV 위치별로 기록된 위반 데이터를 보여줍니다. 각 행은 특정 날짜에 특정 위치에서 발생한 위반의 세부 정보를 제공합니다.
      </p>
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#f2f2f2' }}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #ddd' }}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ padding: '8px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <h1 style={{ textAlign: 'center' }}>위반 예측</h1>
      <p style={{ textAlign: 'center' }}>
        아래 그래프는 미래의 위반 건수를 예측한 결과를 보여줍니다. 날짜별로 예측된 위반 건수를 확인할 수 있습니다.
      </p>
      <LineChart
        width={600}
        height={300}
        data={forecastData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        style={{ margin: '0 auto' }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="날짜" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="예측 위반 건수" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default App;