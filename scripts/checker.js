// From: https://stackoverflow.com/questions/60791758/how-to-get-country-flag-code-given-the-name-of-the-country
function countryCodeToFlag(countryCode) {
  if (
    !countryCode ||
    countryCode.length !== 2 ||
    !/^[a-zA-Z]+$/.test(countryCode)
  ) {
    return "🏳️";
  }
  const code = countryCode.toUpperCase();
  const offset = 127397;
  const flag = Array.from(code)
    .map((letter) => String.fromCodePoint(letter.charCodeAt(0) + offset))
    .join("");

  return flag;
}

const hostname = window.location.hostname;

chrome.runtime.sendMessage(
  { action: "checkHostname", hostname },
  (response) => {
    console.log(response);

    const resultDiv = document.createElement("div");
    resultDiv.id = "website-checker";
    resultDiv.style.position = "fixed";
    resultDiv.style.bottom = "0";
    resultDiv.style.right = "0";
    resultDiv.style.width = "fit-content";
    resultDiv.style.padding = "3px 5px 3px 5px";
    resultDiv.style.backgroundColor = "#ffffff";
    // resultDiv.style.border = "1px solid #000000";
    resultDiv.style.borderRadius = "5px";
    resultDiv.style.boxShadow = "0 0 5px #000000";
    resultDiv.style.zIndex = "999999";
    resultDiv.style.fontSize = "12px";
    resultDiv.style.margin = "5px";
    resultDiv.style.color = "#212212"
    resultDiv.style.userSelect = "none";
    resultDiv.style.display = "flex";
    resultDiv.style.flexDirection = "row";
    resultDiv.style.alignItems = "center";
    resultDiv.style.justifyContent = "center";
    resultDiv.innerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <style>
      .wc-button {
        background-color: rgba(0, 0, 0, 0);
        color: #000000;
        border: none;
        border-radius: 5px;
        height: fit-content;
        width: fit-content;
        margin: 0;
        cursor: pointer;
        font-size: 0px !important;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      .wc-button span {
        font-size: 15px;
        font-weight: 550;
      }
    </style>
    <button class="wc-button"><span class="material-symbols-rounded">arrow_drop_down</span></button><p style="margin: 0px;">IP: <a href="https://${response.query}">${response.query}</a> ${countryCodeToFlag(response.countryCode)} ${response.isp} <a href="https://check-host.net/ip-info?host=${response.query}">More Info</a></p>
  `;
    document.body.appendChild(resultDiv);
  }
);
