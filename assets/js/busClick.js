import * as apiData from "./dataList.js";
import * as key from "./apiKey.js";

const route = document.querySelector(".route");
const bus6 = document.getElementById("bus6");
const bus6_1 = document.getElementById("bus6-1");
const bus9 = document.getElementById("bus9");
const direction1 = document.getElementById("direction1");
const direction2 = document.getElementById("direction2");
let directionname = "동의대본관행";
let bstopnmList = [];
let busid = "5290506000";



// 정류소에 버스 도착 예상시간 가져오기
async function getbus_time(lineid, bstopnm) {
  console.log(bstopnm);
  // 버스 id 가져오기
  const xmlData1 = await apiData.fetchXmlData1(
    key.station_url1,
    "bstopnm",
    bstopnm,
    key.apikey
  );

  const parser1 = new DOMParser();
  const xmlDoc1 = parser1.parseFromString(xmlData1, "text/xml");
  let bstopid = xmlDoc1.getElementsByTagName("bstopid");

    // 버스 id 가져오기
    const xmlData5 = await apiData.fetchXmlData5(
      key.station_url5,
      "lineid",
      lineid,
      "bstopid",
      bstopid[0].textContent,
      key.apikey
    );
  
    const parser2 = new DOMParser();
    const xmlDoc2 = parser2.parseFromString(xmlData5, "text/xml");
    let bstoptime = xmlDoc2.getElementsByTagName("min2");

    console.log(bstoptime);
    if (bstoptime[0].textContent){
      return bstoptime[0].textContent;
    }else {
      return "error";
    }
    try {
      let bstoptime2 = bstoptime[0].textContent;
      return bstoptime2;
    } catch (error) {
      console.error("XML 데이터 가져오기 실패:", error);
      return "error";
    }
}

// 주요 정차 정류소 데이터 가져오기
async function getbus_stop(busid, directionname) {
  const xmlData = await apiData.fetchXmlData(
    key.station_url,
    "lineid",
    busid,
    key.apikey
  );

  if (xmlData) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    bstopnmList = [];
    let rpoint = xmlDoc.getElementsByTagName("rpoint");
    const bstopnmElements = xmlDoc.getElementsByTagName("bstopnm");

    console.log(rpoint);
    let index = 0;
    for (let i = 0; i < rpoint.length; i++) {
      if (rpoint[i].textContent === "1") {
        index = i;
        break;
      }
    }

    if (directionname === "동의대본관행") {
      for (let i = 0; i < rpoint.length; i++) {
        if (rpoint[i].textContent === "1") {
          for (let j = 0; j < i; j++) {
            const bstopnm = bstopnmElements[j].textContent;
            bstopnmList.push(bstopnm);
          }
        }
      }
    }

    if (directionname === "동의대역행") {
      for (let i = index; i < rpoint.length; i++) {
            const bstopnm = bstopnmElements[i].textContent;
            bstopnmList.push(bstopnm);
      }
    }

    console.log(bstopnmList);
    const lastValue = bstopnmList.length - 1;

    if (bstopnmList) {
      while (route.hasChildNodes()) {
        route.removeChild(route.firstChild);
      }

      for (let i = 0; i < bstopnmList.length; i++) {
        fordata(busid, bstopnmList, lastValue, i);
      }
    } else {
      console.log("태그 값이 없습니다.");
    }
  } else {
    console.log("XML 데이터 가져오기 실패");
  }
}

function fordata(busid, bstopnmList, lastValue, i) {
  let div = document.createElement("div");
  div.className = "box";
  route.appendChild(div);

  let div2 = document.createElement("div");
  div2.className = "v-line-container";
  div.appendChild(div2);

  let div5 = document.createElement("div");
  div5.className = "text-container";
  div.appendChild(div5);

  let h2 = document.createElement("h2");
  h2.textContent = bstopnmList[i];
  div5.appendChild(h2);

  let p = document.createElement("p");
  const t_data = getbus_time(busid, bstopnmList[i]);
  console.log(t_data);

  const data = () => {
    t_data.then((appData) => {
      p.textContent = appData+"분 후 도착 예정";
      console.log(appData);
    });
  };
  data();
  
  div5.appendChild(p);

  let hr = document.createElement("hr");
  div.appendChild(hr);

  let img = document.createElement("img");
  img.src = "./assets/img/alarm.jpg";
  div.appendChild(img);

  let div3 = document.createElement("div");
  div3.className = "v-line";
  div2.appendChild(div3);

  let div4 = document.createElement("div");
  div4.className = "dot";
  div2.appendChild(div4);

  if (i === lastValue) {
    div3.remove();
  }
}

function bus6Click() {
  busid = "5290506000";
  // 정류장 데이터 가져오기
  bus6.style.backgroundColor = "#000069";
  bus6.style.color = "white";
  bus6_1.style.backgroundColor = "#b4b4dc";
  bus6_1.style.color = "black";
  bus9.style.backgroundColor = "#b4b4dc";
  bus9.style.color = "black";
  getbus_stop(busid, directionname);
}

bus6.addEventListener("click", bus6Click);

function bus6_1Click() {
  busid = "5290506100";
  bus6.style.backgroundColor = "#b4b4dc";
  bus6.style.color = "black";
  bus6_1.style.backgroundColor = "#000069";
  bus6_1.style.color = "white";
  bus9.style.backgroundColor = "#b4b4dc";
  bus9.style.color = "black";
  getbus_stop(busid, directionname);
}

bus6_1.addEventListener("click", bus6_1Click);

function bus9Click() {
  busid = "5290509000";
  bus6.style.backgroundColor = "#b4b4dc";
  bus6.style.color = "black";
  bus6_1.style.backgroundColor = "#b4b4dc";
  bus6_1.style.color = "black";
  bus9.style.backgroundColor = "#000069";
  bus9.style.color = "white";
  getbus_stop(busid, directionname);
}

bus9.addEventListener("click", bus9Click);

function direction1Click() {
  directionname = direction1.innerText;
  direction1.style.backgroundColor ="#000069";
  direction1.style.color = "white";
  direction2.style.backgroundColor ="#b4b4dc";
  direction2.style.color = "black";
  getbus_stop(busid, directionname);
}

direction1.addEventListener("click", direction1Click);

function direction2Click() {
  directionname = direction2.innerText;
  direction1.style.backgroundColor ="#b4b4dc";
  direction1.style.color = "black";
  direction2.style.backgroundColor ="#000069";
  direction2.style.color = "white";
  getbus_stop(busid, directionname);
}

direction2.addEventListener("click", direction2Click);

