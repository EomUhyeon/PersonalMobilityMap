export const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const csvText = await response.text();
      return csvText;
    } catch (error) {
      console.error('Error fetching CSV data:', error);
      throw error;
    }
  };
  
  export const parseHelmetData = (csv, sampleRate = 10) => {
    const data = csv
      .trim()
      .split('\n')
      .slice(1)
      .map(line => {
        const [date, , violationType, , , , trafficVolume] = line.split(',');
        if (violationType === '헬멧 미착용') {
          return { date, violationType, trafficVolume: parseInt(trafficVolume, 10) };
        }
        return null;
      })
      .filter(item => item !== null);

    const sampledData = [];
    for (let i = 0; i < data.length; i += sampleRate) {
      const chunk = data.slice(i, i + sampleRate);
      const averageVolume = chunk.reduce((sum, item) => sum + item.trafficVolume, 0) / chunk.length;
      sampledData.push({
        date: chunk[0].date,
        violationType: chunk[0].violationType,
        trafficVolume: Math.round(averageVolume),
      });
    }

    return sampledData;
  };

  export const parseViolationData = (csv) => {
    return csv
      .trim()
      .split('\n')
      .slice(1)
      .map(line => {
        const [date, , , violationCount] = line.split(',');
        return { date, violationCount: parseInt(violationCount, 10) };
      })
      .reduce((acc, { date, violationCount }) => {
        acc[date] = (acc[date] || 0) + violationCount;
        return acc;
      }, {});
  };

  export const parseLaneViolationData = (csv, sampleRate = 30) => {
    const data = csv
      .trim()
      .split('\n')
      .slice(1)
      .map(line => {
        const [date, , violationType, , , , trafficVolume] = line.split(',');
        if (violationType === '1차선 주행') {
          return { date, trafficVolume: parseInt(trafficVolume, 10) };
        }
        return null;
      })
      .filter(item => item !== null);

    const sampledData = [];
    for (let i = 0; i < data.length; i += sampleRate) {
      const chunk = data.slice(i, i + sampleRate);
      const averageVolume = chunk.reduce((sum, item) => sum + item.trafficVolume, 0) / chunk.length;
      sampledData.push({
        date: chunk[0].date,
        trafficVolume: Math.round(averageVolume),
      });
    }

    return sampledData;
  };

  export const parseReverseDrivingData = (csv, sampleRate = 10) => {
    const data = csv
      .trim()
      .split('\n')
      .slice(1)
      .map(line => {
        const [date, , violationType, , , , trafficVolume] = line.split(',');
        if (violationType === '역주행') {
          return { date, trafficVolume: parseInt(trafficVolume, 10) };
        }
        return null;
      })
      .filter(item => item !== null);

    const sampledData = [];
    for (let i = 0; i < data.length; i += sampleRate) {
      const chunk = data.slice(i, i + sampleRate);
      const averageVolume = chunk.reduce((sum, item) => sum + item.trafficVolume, 0) / chunk.length;
      sampledData.push({
        date: chunk[0].date,
        trafficVolume: Math.round(averageVolume),
      });
    }

    return sampledData;
  };

  export const parseCenterLineViolationData = (csv, sampleRate = 10) => {
    const data = csv
      .trim()
      .split('\n')
      .slice(1)
      .map(line => {
        const [date, , violationType, , , , trafficVolume] = line.split(',');
        if (violationType === '중앙선 침범') {
          return { date, trafficVolume: parseInt(trafficVolume, 10) };
        }
        return null;
      })
      .filter(item => item !== null);

    const sampledData = [];
    for (let i = 0; i < data.length; i += sampleRate) {
      const chunk = data.slice(i, i + sampleRate);
      const averageVolume = chunk.reduce((sum, item) => sum + item.trafficVolume, 0) / chunk.length;
      sampledData.push({
        date: chunk[0].date,
        trafficVolume: Math.round(averageVolume),
      });
    }

    return sampledData;
  };