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

  const markRoomAsClicked = (roomLink) => {
    const roomTitle = roomLink.innerText;
    const localRoomList = JSON.parse(localStorage.getItem('roomList'));
    const clickedRoom = localRoomList.find(room => room.title == roomTitle);

    clickedRoom.wasClicked = true;
    localStorage.setItem('roomList', JSON.stringify(localRoomList));
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

  const updateLocalRoomList = (newRoom) => {
    const localRoomList = JSON.parse(localStorage.getItem('roomList'));

    localRoomList.unshift(newRoom);
    localStorage.setItem('roomList', JSON.stringify(localRoomList));
  }

  const reloadPage = (timeForReload) => {
    setTimeout(() => location.reload(), timeForReload)
  }

  const handlePosts = () => {
    const firstResult = results[0];
    const firstRoomListItem = localRoomList[0];

    if (newRoomAvailable(firstResult, firstRoomListItem)) {
      updateLocalRoomList(firstResult);
      triggerNotification();
      reloadPage(300000);
    } else {
      console.log('continue search')
      reloadPage(10000);
    }
  }

  const bindEvent = () => {
    document.querySelectorAll('.offer_list_item').forEach(card => {
      card.addEventListener('click', (el) => {
        markRoomAsClicked(el.target);
      })
    })
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

  const results = getResults();

  bindEvent();
  removeAdds();

  if (localRoomList) {
    handlePosts();
  } else {
    localStorage.setItem('roomList', JSON.stringify(results));
  }
}
