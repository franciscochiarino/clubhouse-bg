// let powerButton = document.getElementById('powerButton');

// chrome.storage.sync.get('color', function (data) {
//   changeColor.style.background = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.background = "' + color + '";'});
//   });

//   let titles = `document.getElementsByClassName("column-name")`;
//   titles.forEach((title) => {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             {code: `${title}.style.color = white`});
//           });
//   })
// };

const toggleExtension = function () {
  let currentState = localStorage.currentState || "start";
  let toggleBtn = document.getElementById('toggle-btn')

  if (currentState === "stop") {
    toggleBtn.innerHTML("OFF");
  }

  toggleBtn.onClick = function () {
    if (currentState === "start") {
      toggleBtn.innerHTML("OFF");
      localStorage.currentState = "stop";
    }
    if (currentState === "stop") {
      toggleBtn.innerHTML("ON");
      localStorage.currentState = "start";
    }
    alert('clicked')
  }
};
toggleExtension()
