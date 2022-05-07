{
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
    })
  }

  const removeAdds = () => {
    document.getElementById('partners_wrapper').style.display = 'none';
  };

  const lookForNewPosts = () => {
    setTimeout(() => {
      if (isLastPostRecent()) {
        triggerNotification();
      } else {
        console.log('No new uploaded, will reload the page...')
        setTimeout(() => {
          location.reload()
        }, 10000)
      }
    }, 3000);
  };

  const isLastPostRecent = () => {
    const uploadTimeText = document.querySelector('.offer_list_item .row .card_body .bottom .col-xs-9 .row:last-child .col-sm-12 span:last-child').innerText;
    const timeSinceUpload = parseInt(uploadTimeText.split(' ')[1]);

    return (
      timeSinceUpload < 5 && uploadTimeText.includes('Minuten') ||
      uploadTimeText.includes('Online: 1 Minute') ||
      uploadTimeText.includes('Sekunden')
    )
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
  getResults();
  lookForNewPosts();
}
