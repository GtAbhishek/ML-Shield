document.addEventListener('DOMContentLoaded', function() {
  // Initialize the status indicators
  chrome.storage.local.get('safeStatus', function(result) {
    //   document.getElementById('safe-status').innerText = result.safeStatus || '';
    var status = result.safeStatus || '';
    document.getElementById('safe-status').innerText = status;
    updateBackgroundColor(status);
  });

  // Initialize the counter values
  chrome.storage.local.get(['safeCounter', 'unsafeCounter'], function(result) {
      document.getElementById('safe-counter').innerText = result.safeCounter || 0;
      document.getElementById('unsafe-counter').innerText = result.unsafeCounter || 0;
  });

  // Reset counters button
  document.getElementById('reset').addEventListener('click', function() {
      chrome.storage.local.set({ safeCounter: 0, unsafeCounter: 0 });
      document.getElementById('safe-counter').innerText = 0;
      document.getElementById('unsafe-counter').innerText = 0;
  });

  // Retrieve current URL
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var url = tabs[0].url;
      document.getElementById('url').innerHTML = "<b>Current Url:</b> " + url;
  });
});


  

function updateBackgroundColor(status) {
    var statusElement = document.getElementById('safe-status');
    if (status === 'UNSECURE') {
      statusElement.classList.remove('safe-background');
      statusElement.classList.add('unsafe-background');
    } else if (status === 'SECURE') {
      statusElement.classList.remove('unsafe-background');
      statusElement.classList.add('safe-background');
    } else {
      statusElement.classList.remove('safe-background', 'unsafe-background');
    }
  }