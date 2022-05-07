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
toggleExtension();
