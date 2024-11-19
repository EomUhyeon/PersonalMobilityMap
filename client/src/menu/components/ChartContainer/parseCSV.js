export const parseCSV = (csv, filterType) => {
    return csv
      .trim()
      .split('\n')
      .slice(1)
      .map(line => {
        const [date, , violationType, , , , trafficVolume] = line.split(',');
        if (violationType === filterType) {
          return { date, trafficVolume: parseInt(trafficVolume, 10) };
        }
        return null;
      })
      .filter(item => item !== null);
  };

export const parseLaneViolationData = (csv, sampleRate = 10) => {
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