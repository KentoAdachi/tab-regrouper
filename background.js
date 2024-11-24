chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "regroupTabs") {
    const userPrompt = request.prompt;
    const apiKey = request.apiKey;
    const apiEndpoint = request.apiEndpoint;
    const model = request.model;
    regroupTabs(userPrompt, apiKey, apiEndpoint, model, (result) => {
      sendResponse(result);
    });
    return true; // 非同期応答を継続するためのフラグ
  }
});

const regroupTabs = async (
  prompt,
  apiKey,
  apiEndpoint,
  model,
  completionHandler
) => {
  chrome.tabs.query({}, async (tabs) => {
    const tabInfo = tabs.map((tab) => ({
      id: tab.id,
      title: tab.title,
      url: tab.url,
    }));

    const input = JSON.stringify(tabInfo);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: prompt,
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();
      console.log("Response from OpenAI API:", data);
      let clusters;
      try {
        clusters = JSON.parse(data.choices[0].message.content.trim());
      } catch (error) {
        console.error("Failed to parse response:", error);
        completionHandler({
          status: "error",
          message: "Failed to parse response",
        });
        return;
      }

      for (const groupName in clusters) {
        const tabIds = clusters[groupName].map((tab) => tab.id);
        chrome.tabs.group({ tabIds }, (groupId) => {
          if (chrome.runtime.lastError) {
            console.error("Error grouping tabs:", chrome.runtime.lastError);
            return;
          }
          if (groupId) {
            chrome.tabGroups.update(groupId, { title: groupName }, () => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error updating group title:",
                  chrome.runtime.lastError
                );
              } else {
                console.log(`Group '${groupName}' updated with ID ${groupId}`);
              }
            });
          } else {
            console.error("groupId is null or undefined");
          }
        });
      }
      completionHandler({ status: "success" });
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
      completionHandler({
        status: "error",
        message: "Error fetching data from OpenAI API",
      });
    }
  });
};
