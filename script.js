const selectMenu = document.querySelectorAll('select'),
  setAlarmbtn = document.querySelector("button"),
  currentTime = document.querySelector('h1'),
  content = document.querySelector('.content');
let Settedtime, isAlarmSet = false;
let rington = new Audio("matirials/oneplus.mp3");

for (let i = 12; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = ` <option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 00; i--) {
  i = i < 10 ? "0" + i : i;
  let option = ` <option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 1; i >= 0; i--) {
  let ampm = (i == 1) ? "AM" : "PM";
  let option = ` <option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//making clock
setInterval(() => {
  // getting dates
  let dt = new Date();

  let h = dt.getHours();
  let m = dt.getMinutes();
  let s = dt.getSeconds();

  let ampm = "AM";

  // setting 12 hours format
  if (h >= 12)
    h = h - 12, ampm = "PM";

  //if h == 0 then setting it as 12
  h = h == 0 ? 12 : h;

  //setting in two digit format

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
  if (Settedtime == `${h}:${m}:${ampm}`) {
    console.log("Alarm Ringing...");
    rington.play();
    // rington.loop = true;//it will play ringtone for infinite
  }
}, 1000);

setAlarmbtn.addEventListener('click', () => {

  // console.log(isAlarmSet);

  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;

  if (time.includes("Hours") || time.includes("Minute") || time.includes("am-pm")) {
    alert("Please Select valid time first");
    return;
  }

  //when alarm is set ,undo all changes(resetting)
  if (isAlarmSet) {
    Settedtime = "";
    rington.pause();
    content.classList.remove("disable");
    setAlarmbtn.innerText = "Set Alarm";
    setAlarmbtn.style.background = "green";
    isAlarmSet = false;
    return;
  }

   //setting up alarm
    isAlarmSet = true;
    Settedtime = time;
    content.classList.add("disable");
    setAlarmbtn.innerText = "Clear Alarm";
    setAlarmbtn.style.background = "red";
});