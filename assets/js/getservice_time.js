import * as apiData from "./dataList.js";
import * as key from "./apiKey.js";

const service_time = document.querySelector("#service_time");
let lastData = localStorage.getItem('btn');

// 운행 시간 데이터 가져오기
async function getservice_time(lastData) {
  const xmlData = await apiData.fetchXmlData(
    key.route_url,
    "lineno",
    lastData,
    key.apikey
  );

  if (xmlData) {
    const firsttime = "firsttime"; // 가져오고 싶은 태그명 설정
    const endtime = "endtime"; // 가져오고 싶은 태그명 설정

    const firstValue = apiData.extractTagValue(xmlData, firsttime);
    const endValue = apiData.extractTagValue(xmlData, endtime);

    if (firstValue && endValue) {
      console.log(firstValue + " " + endValue);
      service_time.innerHTML = `평일/주말 : ${firstValue} ~ ${endValue}`;
    } else {
      console.log(tagName + " 태그 값이 없습니다.");
    }
  } else {
    console.log("XML 데이터 가져오기 실패");
  }
}

getservice_time(lastData);
