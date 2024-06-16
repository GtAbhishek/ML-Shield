chrome.extension.onRequest.addListener(function (prediction) {
  if (prediction == 1) {
    alert("Warning: Phishing detected!!");
  } else if (prediction == -1) {
    ("No phishing detected");
  }
});


chrome.extension.onRequest.addListener(function(prediction) {
  if (prediction) {
    updateCounters(prediction);
  }
});

function updateCounters(prediction) {
  if (prediction === 1) {
    chrome.storage.local.get('unsafeCounter', function(result) {
      var count = result.unsafeCounter || 0;
      count++;
      chrome.storage.local.set({ unsafeCounter: count });
      sendMessageToPopup({ action: 'updateCounters', counters: { safeCounter: 0, unsafeCounter: count } });
    });
  } else if (prediction === -1) {
    chrome.storage.local.get('safeCounter', function(result) {
      var count = result.safeCounter || 0;
      count++;
      chrome.storage.local.set({ safeCounter: count });
      sendMessageToPopup({ action: 'updateCounters', counters: { safeCounter: count, unsafeCounter: 0 } });
    });
  }
}

chrome.storage.local.set({ safeStatus: '' });
chrome.extension.onRequest.addListener(function(prediction) {
  if (prediction === 1) {
      chrome.storage.local.set({ safeStatus: 'UNSECURE' });
  } else if (prediction === -1) {
      chrome.storage.local.set({ safeStatus: 'SECURE' });
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  // Reset safeStatus to initial value
  chrome.storage.local.set({ safeStatus: '' });
});

function sendMessageToPopup(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

