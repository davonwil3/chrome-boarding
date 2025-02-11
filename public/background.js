chrome.action.onClicked.addListener(async (tab) => {
    try {
      chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" }, (response) => {
        if (chrome.runtime.lastError) {
          console.warn("Content script not found, injecting...");
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
          });
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
  