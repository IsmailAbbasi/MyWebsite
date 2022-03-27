const display = document.getElementById("clock");
const audio = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
);
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
// let snoozeAlarm = value

function updateTime() {
  const date = new Date();

  const hour = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());

  display.innerText = `${hour} : ${minutes} : ${seconds}`;
}
function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}
function setAlarmTime(value) {
  alarmTime = value;
}

function setAlarm() {
  console.log(alarmTime);
  if (alarmTime) {
    console.log("ok1");
    const current = new Date();
    const timeToAlarm = new Date(alarmTime);
    if (timeToAlarm > current) {
      console.log("ok2");
      const timeout = timeToAlarm.getTime() - current.getTime();
      alarmTimeout = setTimeout(() => {
        audio.play();
        document.getElementById("set-alarm-container").style.display = "none";
        document.getElementById("snooze-alarm-container").style.display ="block";
      }, timeout);
      // alert("Alarm Set");
      Swal.fire({
        icon: 'success',
        title: 'Alarm Set',
        text: 'Alarm will ring in - minutes',
      })
    }
  }
}

function clearAlarm() {
  audio.pause();
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    alert("Alarm Cleared");
  }
}

function snoozeAlarm() {
stopAlarm();
  // let minutesToAdd = 5;
  // const current = new Date();
  let minutesToAdd=0.5;
  let currentDate = new Date();
  let timeToAlarm = new Date(currentDate.getTime() + minutesToAdd*60000);
  // const timeToAlarm = new Date(minutesToAdd);
  // if (timeToAlarm > current) {
  const timeout = timeToAlarm.getTime() - currentDate.getTime();
  alarmTimeout = setTimeout(() => {
    audio.play();
  }, timeout);
    alert("Alarm Snoozed");
  }
// }

function stopAlarm() {
  audio.pause();
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    alert("Alarm Stopped");
    document.getElementById("set-alarm-container").style.display = "block";
    document.getElementById("snooze-alarm-container").style.display ="none";
  }
}

setInterval(updateTime, 1000);
