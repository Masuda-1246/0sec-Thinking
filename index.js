let txt
let today
let time = "00:00"
let timer 
let interval
let title
let timeLabel


window.addEventListener('load', () => {
  createDate()

  const datelabel = document.getElementById("today")
  const startButton = document.getElementById('start')
  const okButton = document.getElementById('ok');

  datelabel.innerHTML = today
  startButton.addEventListener('click',startTimer)
  okButton.addEventListener('click', finishEdit);

  timeLabel = document.getElementById('time')
  timeLabel.innerHTML = time
});


function startTimer(){
  const content = document.getElementById('content')
  const startTime = new Date().getTime()

  content.setAttribute("class","place-content-center m-3 border rounded-lg drop-shadow-lg")
  document.getElementById("start").disabled = true
  timer = setInterval(function(){counter(startTime)},1000)
}

function finishEdit(){
  clearInterval(timer)

  const ok = document.getElementById("ok")
  const download = document.getElementById("download")
  const downloadBtn = document.getElementById('downloadBtn');
  
  ok.setAttribute("disabled","true")
  download.setAttribute("class","m-3 border rounded-lg drop-shadow-lg")
  downloadBtn.addEventListener('click', downloadBtn_clicked);
  
  let contents = document.getElementById("contents").value
  title = document.getElementById("title").value
  title = !title.match(/\S/g) ? "無題":title 

  txt = `タイトル:${title}\n
          日付:${today}\n
          時間:${time} \n
          内容:${contents}`
}

function downloadBtn_clicked(evt) {
  evt.preventDefault();
  const blob = new Blob([txt], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  document.body.appendChild(a);
  a.download = `${title}_${today}.txt`;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function createDate(){
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()+1
  const date = now.getDate()

  today = `${year}/${month}/${date}`
}

function counter(startTime){
  let now = new Date().getTime()
  interval = Math.floor((now -startTime)/1000)
  let min = Math.floor(interval/60)
  min = min >= 10 ? min:"0"+min
  let sec = interval%60
  sec = sec >= 10 ? sec:"0"+sec
  time = `${min}:${sec}`
  timeLabel.innerHTML = time
}
