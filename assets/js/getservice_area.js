import * as apiData from "./dataList.js";
import * as key from "./apiKey.js";

const service_area = document.querySelector("#service_area");
let lastData = localStorage.getItem('btn');

// 운행지역 데이터 가져오기
async function getservice_area(lastData) {
  const xmlData = await apiData.fetchXmlData(
    key.route_url,
    "lineno",
    lastData,
    key.apikey
  );

  if (xmlData) {
    const startpoint = "startpoint"; // 가져오고 싶은 태그명 설정
    const endpoint = "endpoint"; // 가져오고 싶은 태그명 설정
    const companyid = "companyid"; // 가져오고 싶은 태그명 설정

    const startValue = apiData.extractTagValue(xmlData, startpoint);
    const endValue = apiData.extractTagValue(xmlData, endpoint);
    const companyValue = apiData.extractTagValue(xmlData, companyid);

    if (startValue && endValue) {
      console.log(startValue + " " + endValue);
      service_area.innerHTML = `${startValue}<->${endValue}
        <br>
        운수업체 : ${companyValue}`;
    } else {
      console.log(tagName + " 태그 값이 없습니다.");
    }
  } else {
    console.log("XML 데이터 가져오기 실패");
  }
}

getservice_area(lastData);
