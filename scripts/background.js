chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkHostname") {
    console.log("Checking hostbane: ", request.hostname);
    fetch(
      `http://ip-api.com/json/${request.hostname}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(async (data) => {
        sendResponse(data);
      })
      .catch((error) => sendResponse({ error: error.message }));

    return true; // Keeps the message channel open for async response
  }
});
