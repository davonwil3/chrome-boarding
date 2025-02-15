chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        let iframe = document.getElementById("boarding-extension");
  
        if (iframe) {
          iframe.remove(); // Remove iframe if it exists (toggle behavior)
        } else {
          iframe = document.createElement("iframe");
          iframe.id = "boarding-extension";
          iframe.src = chrome.runtime.getURL("index.html"); // ✅ Loads your React app inside iframe
          iframe.style.position = "fixed";
          iframe.style.top = "0";
          iframe.style.left = "0";
          iframe.style.width = "400px";
          iframe.style.height = "100vh";
          iframe.style.border = "none";
          iframe.style.zIndex = "9999";
          iframe.style.backgroundColor = "white";
  
          document.body.appendChild(iframe);
        }
      },
    });
  });
  
  