async function assessRequest(request) {
  const domain = stripDomainFromURL(request.url);
  let foundInWL = false;
  for(const regex of WHITELIST) {
    if(regex.test(domain)) {
      foundInWL = true;
      break;
    }
  }
  if(foundInWL) {
    return;
  }

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
      if(domain === record.value) {
        block = true;
        break;
      }
    }
  }

  if(block) {
    const preferences = (await browser.storage.local.get('preferences')).preferences;
    console.log(preferences, request.tabId)
    if(preferences.strictProtection == 1 && request.tabId >= 0) {
      actionBlockTab(request.tabId, domain);
    }
    else if(request.tabId >= 0){
      tryBlockingTab(request.tabId, domain);
    }

    return {cancel: true}
  }
}

browser.webRequest.onBeforeRequest.addListener(
  assessRequest,
  {urls: ["<all_urls>"]},
  ["blocking"]
);
