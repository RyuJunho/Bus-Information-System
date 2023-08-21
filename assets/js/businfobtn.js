const bus6 = document.querySelector("#businfo6");
const bus6_1 = document.querySelector("#businfo6_1");
const bus9 = document.querySelector("#businfo9");



bus6.addEventListener("click", Businfoclick1);
function Businfoclick1(){
  localStorage.setItem('btn',bus6.innerText);
  localStorage.setItem('lineid',"5290506000");
  window.location.href = "bus_info.html";
}

bus6_1.addEventListener("click", Businfoclick2);
function Businfoclick2(){
    localStorage.setItem('btn',bus6_1.innerText);
    localStorage.setItem('lineid',"5290506100");
  window.location.href = "bus_info.html";
}

bus9.addEventListener("click", Businfoclick3);
function Businfoclick3(){
    localStorage.setItem('btn',bus9.innerText);
    localStorage.setItem('lineid',"5290509000");
  window.location.href = "bus_info.html";
}