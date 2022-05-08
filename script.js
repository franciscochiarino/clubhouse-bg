{
  const localRoomList = JSON.parse(localStorage.getItem('roomList'));

  class Room {
    constructor(id, title, wasContacted, wasClicked = false) {
      this.id = id;
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
          result.id,
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

  const openInNewTab = (cardId) => {
    const postUrl = document.querySelector(`#${cardId} .truncate_title a`).href;

    window.open(postUrl, '_blank');
  }

  const logMessage = (msg) => {
    console.log(
      `%c${msg}`,
      'color: orange; font-size: 12px;'
    );
  }

  const handlePosts = () => {
    const firstResult = results[0];
    const firstRoomListItem = localRoomList[0];

    if (newRoomAvailable(firstResult, firstRoomListItem)) {
      updateLocalRoomList(firstResult);
      triggerNotification();
      openInNewTab(firstResult.id);
      logMessage('New room opened in a new tab. Will reload page.');
    } else {
      logMessage('No new room available. Will reload page.');
    }

    setTimeout(() => location.reload(), 15000);
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
  }

  const triggerNotification = () => {
    const fiveMinutes = 300000;
    const port = chrome.extension.connect({
      name: "notification request"
    });

    port.postMessage("triggerNotification");
    setTimeout(() => location.reload(), fiveMinutes);
  }

  const results = getResults();

  logMessage('WG-Gesucht extension:');
  bindEvent();
  removeAdds();

  if (localRoomList) {
    handlePosts();
  } else {
    localStorage.setItem('roomList', JSON.stringify(results));
    logMessage('Saved results to local storage');
  }
}
