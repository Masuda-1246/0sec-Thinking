let txt
let today
let time = "00:00"
let timer 
let interval
let title
let timeLabel

window.addEventListener('load', () => {
  createDate()
  const okButton = document.getElementById('ok');
  okButton.addEventListener('click', finishEdit);
  const datelabel = document.getElementById("a")
  datelabel.innerHTML = today
  const startButton = document.getElementById('start')
  startButton.addEventListener('click',startTimer)
  const stopButton = document.getElementById('stop')
  stopButton.addEventListener('click',stopTimer)
  timeLabel = document.getElementById('time')
  timeLabel.innerHTML = time
});

let a


function finishEdit(){
  title = document.getElementById("title").value
  let contents = document.getElementById("contents").value
  txt = 
  `タイトル:${title}\n
  日付:${today}\n
  時間:${time} \n
  内容:${contents}`
  const button1 = document.getElementById('button1');
  button1.addEventListener('click', button1_clicked);
}

function createDate(){
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()+1
  const date = now.getDate()
  console.log("year is "+year)
  console.log("month is "+month)
  console.log("date is "+date)
  today = `${year}/${month}/${date}`
  console.log("today",typeof today)
}



function startTimer(){
  const startTime = new Date().getTime()
  timer = setInterval(function(){counter(startTime)},1000)
}

function stopTimer(){
  clearInterval(timer)
}


function counter(startTime){
  let now = new Date().getTime()
  interval = Math.floor((now -startTime)/1000)
  let min = Math.floor(interval/60)
  min = min >= 10 ? min:"0"+min
  let sec = interval%60
  sec = sec >= 10 ? sec:"0"+sec
  time = `${min}:${sec}`
  console.log("time:"+ time)
  timeLabel.innerHTML = time
}

function button1_clicked(evt) {
  evt.preventDefault();

  const blob = new Blob([txt], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = `${title}-${today}.txt`;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
