let prevText = "";
let isPlaying = false;
let playbackInterval;

function readAloud(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  window.speechSynthesis.speak(utterance);
}

function processParagraphs() {
  const paragraphs = document.querySelectorAll("p");
  let allText = "";

  paragraphs.forEach((paragraph) => {
    allText += paragraph.textContent;
  });

  const newText = allText.substring(prevText.length);

  if (newText) {
    readAloud(newText);
    prevText = allText;
  }
}

function togglePlayback(play) {
  isPlaying = play;

  if (isPlaying) {
    playbackInterval = setInterval(processParagraphs, 1000);
  } else {
    clearInterval(playbackInterval);
    window.speechSynthesis.cancel();
  }
}

function isChatOpenAIUrl() {
  return window.location.href.startsWith("https://chat.openai.com");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!isChatOpenAIUrl()) {
    return;
  }

  if (request.type === "TOGGLE_PLAYBACK") {
    togglePlayback(!isPlaying);
    sendResponse(isPlaying);
  } else if (request.type === "GET_PLAYBACK_STATE") {
    sendResponse(isPlaying);
  }
});
