// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: "linear-gradient(90deg, rgba(8,0,145,1) 0%, rgba(255,0,219,1) 100%)"}, function() {
//     console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'app.clubhouse.io'},
//       })
//       ],
//           actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });
