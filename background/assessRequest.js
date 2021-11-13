async function assessRequest(request) {
  const blobj = await browser.storage.local.get('blacklist');
  const blacklist = blobj.blacklist.data;
  let block = false;
  for(const record of (blacklist == undefined ? [] : blacklist)) {
    if(record.type === 'url') {
      if(record.value === request.url) {
        block = true;
        break;
      }
    }
    else if(record.type === 'domain') {
      if(stripDomainFromURL(request.url) === record.value) {
        block = true;
        break;
      }
    }
  }

  if(block) {
    // const preferences = await window.localStorage.getItem('preferences');
    const preferences = {protectionLevel: 'strict'};
    if(preferences.protectionLevel === 'strict' && request.tabId >= 0) {
      actionBlockTab(request.tabId, stripDomainFromURL(request.url));
    }

    return {cancel: true}
  }
}

browser.webRequest.onBeforeRequest.addListener(
  assessRequest,
  {urls: ["<all_urls>"]},
  ["blocking"]
);