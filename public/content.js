chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleSidebar") {
      let iframe = document.getElementById("boarding-extension");
  
      if (iframe) {
        iframe.remove();
      } else {
        iframe = document.createElement("iframe");
        iframe.id = "boarding-extension";
        iframe.src = chrome.runtime.getURL("index.html"); // ✅ Now Allowed!
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
    }
  });
  
  
  