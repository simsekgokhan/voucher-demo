import moment from "moment/moment";

const TIME_FORMAT_24 = '24';
const TIME_FORMAT_12 = '12';
export const getTime = (timeStamp, format) => {
  return moment(timeStamp).calendar(null, getFormats(format))
};

const getFormats = (format) =>  {
  let time = 'h:mm A';
  if(format === TIME_FORMAT_24) {
    time = 'H:mm';
  }
  return {
    sameDay: `[Today], ${time}`,
    lastDay: `[Yesterday], ${time}`,
    sameElse: `DD-MM-YYYY, ${time}`,
  }
};
export default {
  TIME_FORMAT_24,
  TIME_FORMAT_12,
}