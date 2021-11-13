function updateBlacklist() {
  const getData = new XMLHttpRequest();
  getData.open("GET", "http://data.phishtank.com/data/online-valid.json");
  getData.onreadystatechange = async function () {
    if(getData.readyState < getData.DONE) {
      return;
    }
    if(getData.status !== 200) {
      console.log('Received status ' + getData.status + ' when updating RBL');
      return;
    }
    const original = JSON.parse(getData.responseText);
    const formatted = [];
    for(const record of original) {
      const domain = stripDomainFromURL(record.url);
      let foundInGL = false;
      for(const g of GREYLIST) {
        if(g === domain) {
          foundInGL = true;
          break;
        }
      }
      formatted.push({
        type: (foundInGL ? 'url' : 'domain'),
        value: (foundInGL ? record.url : domain)
      });
    }
    const blacklist = {
      data: formatted,
      timestamp: Date.now()
    };
    browser.storage.local.set({blacklist});
  };
  getData.send();
}

async function tryUpdatingBlacklist() {
  const blacklist = (await browser.storage.local.get('blacklist')).blacklist;
  if(blacklist == null || blacklist.timestamp == undefined || Date.now() > (blacklist.timestamp + 86400000)) {
    updateBlacklist();
  }
}

tryUpdatingBlacklist();
const updateBlacklistInterval = setInterval(tryUpdatingBlacklist, 3600000);
