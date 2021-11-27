browser.storage.local.get().then((storage) => {
  if(storage.blacklist === undefined)
    storage.blacklist = {
      data: [],
      timestamp: 0
    };
  if(storage.preferences === undefined)
    storage.preferences = {
      strictProtection: 1
    };
  if(storage.logs === undefined)
    storage.logs = [];

  browser.storage.local.set(storage);
});
