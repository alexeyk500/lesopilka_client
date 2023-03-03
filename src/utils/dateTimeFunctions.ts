export const dateDayShift = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getEndOfTheDayDate = (rawDate: Date | string) => {
  const processDate = typeof rawDate === 'string' ? new Date(rawDate) : rawDate;
  const processDateStr = processDate.toISOString();
  const onlyProcessDate = processDateStr.split('T')[0];
  return `${onlyProcessDate}T23:59:59.000Z`;
};

export const dateMonthShift = (startDate: Date, monthShift: number) => {
  let newDate = new Date(startDate);
  return new Date(newDate.setMonth(newDate.getMonth() + monthShift));
};

export const formatUTCtoDDMMMMYYYY = (utcData: string | undefined) => {
  if (utcData) {
    return new Date(utcData).toLocaleString('ru-Ru', {
      month: 'long',
      year: 'numeric',
      day: '2-digit',
    });
  }
  return '';
};

export const formatUTC = (utcData: string | undefined) => {
  if (utcData) {
    return new Date(utcData).toLocaleString('ru-Ru', {
      month: 'long',
      year: 'numeric',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  return null;
};

export const normalizeDate = (data: Date | string) => {
  const newData = new Date(data);
  const newDataStr = newData.toISOString();
  const onlyDataStr = newDataStr.split('T')[0];
  return new Date(onlyDataStr);
};

export const formatUTCtoDDMMYYYY = (utcData: string | undefined) => {
  if (utcData) {
    return new Date(utcData).toLocaleString('ru-Ru', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
  }
  return '';
};
