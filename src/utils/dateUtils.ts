export const getDayFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' }; 
  return date.toLocaleDateString('id-ID', options); 
};

export const getDateFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }; 
  return date.toLocaleDateString('id-ID', options); 
};
