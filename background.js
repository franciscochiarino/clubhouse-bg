chrome.extension.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (msg == 'triggerNotification') {
      chrome.notifications.create({
        title: 'New Post!',
        message: 'Yo Fran, a room is available!',
        iconUrl: 'images/home128.png',
        type: 'basic',
        priority: 2
      });

      new Audio(chrome.runtime.getURL('audio/notification.wav')).play();
    }
  });
})
