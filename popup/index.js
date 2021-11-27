browser.storage.local.get().then(function(storage)
{
  document.getElementById('incidentsNo').innerText = (storage.logs !== undefined) ? storage.logs.length.toString() : "0";

  const dbUpToDate = document.getElementById('dbUpToDate');
  if((storage.blacklist.timestamp === undefined) || (Math.floor((Date.now() - storage.blacklist.timestamp)) > 86400000))
    dbUpToDate.innerText = "❌";
  else
    dbUpToDate.innerText = "✅";

  const protectionActive = document.getElementById('protectionActive');
  var active = (storage.blacklist.timestamp !== undefined && storage.blacklist.timestamp > 0 && storage.preferences !== undefined);
  if(active)
    protectionActive.innerText = "✅";
  else
    protectionActive.innerText = "❌";

  const strictProtection = document.getElementById('strictProtection');
  strictProtection.value = storage.preferences.strictProtection;
});

const extensionVersion = document.getElementById('version');
extensionVersion.innerText = browser.runtime.getManifest().version;

const strictProtection = document.getElementById('strictProtection');
strictProtection.addEventListener('change', async function(e) {
  const storage = await browser.storage.local.get("preferences");
  storage.preferences.strictProtection = e.target.value;
  browser.storage.local.set(storage);
});
