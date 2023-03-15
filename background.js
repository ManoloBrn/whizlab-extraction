chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'OPEN_NEW_TAB') {
      const dataURL = `data:text/plain;charset=utf-8,${request.encodedText}`;
      chrome.tabs.create({ url: dataURL });
    }
  });
  