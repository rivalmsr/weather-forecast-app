export const getTimeAMPM = (_date) => {
  let hours = _date.getHours();
  let minutes = _date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export const convertKelToCel = (_temp) => {
  return Math.round(_temp - 273.15);
};

export const convertMSToKH = (_speed) => {
  return Math.round(_speed * 3.6);
};

export const convertTimestampToDate = (_timestamp) => {
  const date = new Date(_timestamp * 1000);
  return date;
};

export const getObjectDate = (_date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date(_date * 1000);
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');

  return {
    day: days[currentDate.getUTCDay()],
    month: months[currentDate.getUTCMonth()],
    date: currentDate.getUTCDate(),
    time: `${hours} : ${minutes} ${ampm}`,
    year: currentDate.getFullYear(),
  };
};
