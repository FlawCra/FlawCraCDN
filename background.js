var oldstate;

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
	chrome.windows.getCurrent(function(window){
		oldstate = window.state;
		chrome.windows.update(window.id,{state: "fullscreen"}, function(window) {
			console.log(window);
			var creating = chrome.windows.create({url: chrome.runtime.getURL("popup/cdn.html"), height: ((window.height/4)*3), width: ((window.width/4)*3), focused: true, type: "popup"});
			creating.then(function(windowInfo) {
	
				console.log(windowInfo);
				  chrome.windows.update(windowInfo.id,{left: ((window.width/2)-(windowInfo.width/2)),top: ((window.height/2)-(windowInfo.height/2))},function(){
					chrome.windows.update(window.id,{state: oldstate});
				  });
			});
			
		});
		
   	});
	
}



if(typeof browser != 'undefined') {
	browser.browserAction.onClicked.addListener(openPageFireFox);
} else {
	chrome.action.onClicked.addListener(openPageChrome);
}
