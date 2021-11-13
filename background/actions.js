function actionBlockTab(id, domain) {
  browser.tabs.update(id, {
    url: browser.extension.getURL('pages/siteBlocked.html?site=') + encodeURIComponent(domain)
  })
}
