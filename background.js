chrome.runtime.onInstalled.addListener(e => {
    if (e.reason === "install") {
      chrome.tabs.create({ url: "https://buymeacoffee.com/smoresxo" });
    }
  });  