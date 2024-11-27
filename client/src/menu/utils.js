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
  
  const splitByDate = (data) => {
    const cutoffDate = '2024-11-21';
    return data.map(item => {
      const itemDate = item.date;
      return {
        date: itemDate,
        actual: itemDate < cutoffDate ? item.violationCount : null,
        predicted: itemDate >= cutoffDate ? item.violationCount : null
      };
    });
  };

  export const normalizeViolationData = (data, violationType = null) => {
    // 1. 날짜별 위반 건수 계산 (특정 위반 유형 또는 전체)
    const dailyViolations = data
      .trim()
      .split('\n')
      .slice(1)
      .map(line => {
        const [date, , type, violationCount] = line.split(',');
        // 위반 유형이 지정된 경우 해당 유형만 필터링
        if (violationType && type !== violationType) return null;
        return { date, violationCount: parseInt(violationCount, 10) };
      })
      .filter(item => item !== null)
      .reduce((acc, { date, violationCount }) => {
        acc[date] = (acc[date] || 0) + violationCount;
        return acc;
      }, {});

    // 2. 최대 위반 건수 찾기
    const maxViolation = Math.max(...Object.values(dailyViolations));
    
    // 3. 최대값이 100이 되도록 스케일 계산
    const scale = 100 / maxViolation;

    // 4. 모든 값을 스케일에 맞춰 조정
    const normalizedData = Object.entries(dailyViolations).map(([date, count]) => ({
      date,
      violationCount: Math.round(count * scale)
    }));

    return splitByDate(normalizedData);
  };

  export const parseHelmetData = (csv) => {
    return normalizeViolationData(csv, '헬멧 미착용');
  };

  export const parseLaneViolationData = (csv) => {
    return normalizeViolationData(csv, '1차선 주행');
  };

  export const parseReverseDrivingData = (csv) => {
    return normalizeViolationData(csv, '역주행');
  };

  export const parseCenterLineViolationData = (csv) => {
    return normalizeViolationData(csv, '중앙선 침범');
  };

  export const parseViolationData = (csv) => {
    return normalizeViolationData(csv);
  };