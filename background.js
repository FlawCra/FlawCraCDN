function openPageFireFox() {
  var creating = browser.windows.create({url: browser.extension.getURL("popup/cdn.html"), height: ((window.screen.height/4)*3), width: ((window.screen.width/4)*3), focused: true, type: "popup"});
  creating.then(onCreatedFireFox);
}

function onCreatedFireFox(windowInfo) {
	console.log(windowInfo);
	console.log(window.screen);
  	browser.windows.update(windowInfo.id,{left: ((window.screen.width/2)-(windowInfo.width/2)),top: ((window.screen.height/2)-(windowInfo.height/2))});
}

function openPageChrome() {
  var creating = chrome.windows.create({url: browser.extension.getURL("popup/cdn.html"), height: ((window.screen.height/4)*3), width: ((window.screen.width/4)*3), focused: true, type: "popup"});
  creating.then(onCreatedChrome);
}

function onCreatedChrome(windowInfo) {
	console.log(windowInfo);
	console.log(window.screen);
  	chrome.windows.update(windowInfo.id,{left: ((window.screen.width/2)-(windowInfo.width/2)),top: ((window.screen.height/2)-(windowInfo.height/2))});
}

if(typeof browser != 'undefined') {
	browser.browserAction.onClicked.addListener(openPageFireFox);
} else {
	chrome.action.onClicked.addListener(openPageChrome);
}
