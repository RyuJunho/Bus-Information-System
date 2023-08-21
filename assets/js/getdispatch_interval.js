import * as apiData from "./dataList.js";
import * as key from "./apiKey.js";

const dispatch_interval = document.querySelector("#dispatch_interval");
const bus_name = document.getElementById("bus_name");
let lastData = localStorage.getItem('btn');
bus_name.innerText = lastData;

// 배차 간격 데이터 가져오기
async function getdispatch_interval(id) {
  const xmlData = await apiData.fetchXmlData(
    key.route_url,
    "lineno",
    id,
    key.apikey
  );

  console.log(id);

  if (xmlData) {
    const headwaynorm = "headwaynorm"; // 가져오고 싶은 태그명 설정
    const headwaypeak = "headwaypeak"; // 가져오고 싶은 태그명 설정
    const headwayholl = "headwayholl"; // 가져오고 싶은 태그명 설정

    const normValue = apiData.extractTagValue(xmlData, headwaynorm);
    const peakValue = apiData.extractTagValue(xmlData, headwaypeak);
    const holldayValue = apiData.extractTagValue(xmlData, headwayholl);

    if (headwaynorm && headwaypeak) {
      if (holldayValue) {
        dispatch_interval.innerHTML = `일반 : ${normValue}분
          <br>
          출퇴근 : ${peakValue}분
          <br>
          휴일 : ${holldayValue}분`;
      } else {
        dispatch_interval.innerHTML = `일반 : ${normValue}분
          <br>
          출퇴근 : ${peakValue}분
          <br>
          휴일 : 미운행`;
      }
    } else {
      console.log("태그 값이 없습니다.");
    }
  } else {
    console.log("XML 데이터 가져오기 실패");
  }
}

getdispatch_interval(lastData);