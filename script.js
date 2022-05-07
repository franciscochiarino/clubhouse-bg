{
  const localRoomList = JSON.parse(localStorage.getItem('roomList'));

  class Room {
    constructor(title, wasContacted, wasClicked = false) {
      this.title = title;
      this.wasContacted = wasContacted;
      this.wasClicked = wasClicked;
    }
  }

  const getResults = () => {
    const results = [...document.querySelectorAll('.offer_list_item')];
    const rooms = results.map(result => {
      return (
        new Room(
          document.querySelector(`#${result.id} .truncate_title`).title,
          document.querySelector(`#${result.id} .ribbon-contacted`) ? true : false
        )
      )
    });

    return rooms;
  }

  const newRoomAvailable = (firstResult, firstRoomListItem) => {
    console.log('🚀 ~ firstResult.title == firstRoomListItem.title', firstResult.title == firstRoomListItem.title);
    console.log('🚀 ~ firstResult.wasContacted', firstResult.wasContacted);
    console.log('🚀 ~ firstResult.wasClicked', firstResult.wasClicked);
    return (
      !(
        firstResult.title == firstRoomListItem.title ||
        firstResult.wasContacted ||
        firstResult.wasClicked
      )
    )
  }

  const reloadPage = (timeForReload) => {
    setTimeout(() => location.reload(), timeForReload)
  }

  const handlePosts = () => {
    const results = getResults();
    const firstResult = results[0];
    const firstRoomListItem = localRoomList[0];

    if (newRoomAvailable(firstResult, firstRoomListItem)) {
      localStorage.setItem('roomList', JSON.stringify(results));
      triggerNotification();
      reloadPage(300000);
    } else {
      console.log('continue search')
      reloadPage(10000);
    }
  }

  const removeAdds = () => {
    document.getElementById('partners_wrapper').style.display = 'none';
  };

  const triggerNotification = () => {
    const fiveMinutes = 300000;
    const port = chrome.extension.connect({
      name: "notification request"
    });

    port.postMessage("triggerNotification");
    setTimeout(() => location.reload(), fiveMinutes);
  };

  removeAdds();

  if (localRoomList) {
    handlePosts();
  } else {
    localStorage.setItem('roomList', JSON.stringify(getResults()));
  }
}
