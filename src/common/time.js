let minute = 10;
let hour = 2;

export function getTime(){
  minute += 4;

  if(minute > 59) {
    hour += 1;  
    minute = 10;
  }
  
  if(hour > 12)
    hour = 1;

  return hour + ':' + minute;  
}

export function resetTime() {
  minute = 10;
  hour = 2;
}