chrome.commands.onCommand.addListener((command) => {
  if (command === "open-modal") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "openModal" });
    });
  }
});

