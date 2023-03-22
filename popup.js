async function updateButtonState() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { type: "GET_PLAYBACK_STATE" }, (isPlaying) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }

    document.getElementById("start").textContent = isPlaying ? "音声読み上げを停止" : "音声読み上げを開始";
  });
}

document.getElementById("start").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_PLAYBACK" }, (isPlaying) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }

    document.getElementById("start").textContent = isPlaying ? "音声読み上げを停止" : "音声読み上げを開始";
  });
});

// Update the button state when the popup is opened
updateButtonState();
