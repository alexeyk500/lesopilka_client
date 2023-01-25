export const dateMonthShift = (startDate: Date, monthShift: number) => {
  let newDate = new Date(startDate.toISOString());
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
