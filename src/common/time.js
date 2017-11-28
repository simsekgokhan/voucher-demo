let hour = 2;
let minute = 10;

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
  hour = 2;
  minute = 10;
}