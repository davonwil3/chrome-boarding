// Toggle iframe
let iframe = document.getElementById("boarding-extension");

if (iframe) {
  iframe.remove();
} else {
  iframe = document.createElement("iframe");
  iframe.id = "boarding-extension";
  iframe.src = chrome.runtime.getURL("index.html");
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "400px";
  iframe.style.height = "100vh";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  document.body.appendChild(iframe);
}

// Message listener for picking elements
window.addEventListener("message", (event) => {
  if (event.data.type === "START_PICK_MODE") {
    startHoverSelect();
  }
});

function startHoverSelect() {
  const box = document.createElement("div");
  Object.assign(box.style, {
    position: "absolute",
    pointerEvents: "none",
    border: "2px dashed #ec4899",
    backgroundColor: "rgba(236, 72, 153, 0.2)",
    zIndex: "999999",
  });
  document.body.appendChild(box);

  function onMove(e) {
    const rect = e.target.getBoundingClientRect();
    Object.assign(box.style, {
      top: `${window.scrollY + rect.top}px`,
      left: `${window.scrollX + rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  }

  function onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const el = e.target;
    const selector = getUniqueSelector(el);

    box.remove();
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("click", onClick, true);

    const tooltip = document.createElement("div");
    tooltip.textContent = "New Tooltip";
    Object.assign(tooltip.style, {
      position: "absolute",
      top: `${window.scrollY + el.getBoundingClientRect().top - 40}px`,
      left: `${window.scrollX + el.getBoundingClientRect().left}px`,
      background: "#333",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "4px",
      fontSize: "14px",
      zIndex: "999999",
    });
    document.body.appendChild(tooltip);

    // Send selector back to iframe (your React app)
    window.postMessage({ type: "ELEMENT_SELECTED", selector }, "*");
  }

  document.addEventListener("mousemove", onMove);
  document.addEventListener("click", onClick, true);
}

function getUniqueSelector(el) {
  if (el.id) return `#${el.id}`;
  if (el.className && typeof el.className === "string") {
    return `${el.tagName.toLowerCase()}.${el.className.trim().split(/\s+/).join('.')}`;
  }
  return el.tagName.toLowerCase();
}

  
  