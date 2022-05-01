# WG-Gesucht Chrome Extension

This extension manages wg-gesucht.de.

## How it works

Because there's a lot of demand to find a room in Berlin you basically need to reload the website every now and then to see if any new rooms are posted. If you are not one of the very first to send a message to a new post, your chances of getting an invitation to see a room/flat are considerably less. This extension solves that problem.

Once you are on the search page and you have all the filters you want (max. price, room size, location, etc), it will reload the page every 10 seconds. Every time it finds a new post, posted within the last 5 minutes, it will trigger a chrome notification alongside with a notification sound, so no matter what window/program you are currently working on in your computer, you will not miss it.

Once it finds a new post, it will wait 5 minutes until it starts reloading the page again.

## Installation

### Clone this repo

Run the following command to clone this repo:
```
$ gh repo clone franciscochiarino/wg-gesucht
```

### Add the extension to your browser

Open Google Chrome. Go to Setting > Extensions. Make sure you have developer mode turned on (toggle switch on the top right of the window).

Click on "Load Unpacked". Select the wg-gesucht folder.

Done.

### On/Off

This extension will start working automatically once you are on the search page. You'll see the icon turned orange when it's active. Make sure you have allowed notifications for the wg-gesucht website **and** that Chrome notifications are allowed on your computer.

Have a great room search!
