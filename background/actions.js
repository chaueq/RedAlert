function actionBlockTab(id, domain) {
  browser.tabs.update(id, {
    url: browser.extension.getURL('pages/siteBlocked.html?site=') + encodeURIComponent(domain)
  })
}

function tryBlockingTab(id, domain) {
  browser.tabs.get(id).then(((domain, tab) => {
    if(tab.url === "about:newtab") {
      actionBlockTab(tab.id, domain);
      return;
    }
    const d = stripDomainFromURL(tab.url);
    if(d === domain) {
      actionBlockTab(tab.id, domain);
    }
  }).bind(null, domain));
}
