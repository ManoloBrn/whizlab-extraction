document.getElementById('extract').addEventListener('click', async () => {
  alert('Click event triggered');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentScript.js'],
  });
});
