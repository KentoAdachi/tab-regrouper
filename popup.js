document.getElementById("regroup").addEventListener("click", () => {
  const button = document.getElementById("regroup");
  let customPrompt = document.getElementById("prompt").value.trim();

  // デフォルトのプロンプト
  const defaultPrompt = `タブをグルーピングしてください。
回答は以下のjson形式でお願いします。また、プログラムに入力するため、
バッククォートなどの余計な情報は含めず、jsonのみを回答しなさい。

{
グループ名: [{id: タブID}],
...
}`;

  // 入力が空の場合、デフォルトのプロンプトを使用
  if (!customPrompt) {
    customPrompt = defaultPrompt;
  }
  // 入力がある場合、デフォルトのプロンプトに追加
  else {
    customPrompt = `${defaultPrompt}\nなお、以下の指示を厳守すること。\n${customPrompt}`;
  }

  button.disabled = true; // ボタンを無効にする

  chrome.storage.local.get(
    ["apiKey", "apiEndpoint", "model"],
    ({ apiKey, apiEndpoint, model }) => {
      if (!apiKey) {
        alert("Please set API key first.");
        button.disabled = false;
        return;
      }
      if (!apiEndpoint) {
        apiEndpoint = "https://api.openai.com/v1/chat/completions";
      }
      if (!model) {
        model = "gpt-4o-mini";
      }
      chrome.runtime.sendMessage(
        {
          action: "regroupTabs",
          prompt: customPrompt,
          apiKey,
          apiEndpoint,
          model,
        },
        (response) => {
          if (response.status === "success") {
            console.log("Tabs regrouped successfully");
          } else {
            console.error("Failed to regroup tabs:", response.message);
          }
          button.disabled = false; // ボタンを再度有効にする
        }
      );
    }
  );
});

// ページがロードされたときにボタンにフォーカスを当てる
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("regroup").focus();
  chrome.storage.local.get(
    ["apiKey", "customPrompt", "apiEndpoint", "model"],
    ({ apiKey, customPrompt, apiEndpoint, model }) => {
      if (apiKey) {
        document.getElementById("apiKey").value = apiKey;
      }
      if (customPrompt) {
        document.getElementById("prompt").value = customPrompt;
      }
      if (apiEndpoint) {
        document.getElementById("apiEndpoint").value = apiEndpoint;
      }
      if (model) {
        document.getElementById("model").value = model;
      }
    }
  );

  document.getElementById("apiKey").addEventListener("input", () => {
    const apiKey = document.getElementById("apiKey").value;
    if (apiKey) {
      chrome.storage.local.set({ apiKey }, () => {
        console.log("API key saved.");
      });
    }
  });

  document.getElementById("prompt").addEventListener("input", () => {
    const customPrompt = document.getElementById("prompt").value.trim();
    chrome.storage.local.set({ customPrompt }, () => {
      console.log("Custom prompt saved.");
    });
  });

  document.getElementById("apiEndpoint").addEventListener("input", () => {
    let apiEndpoint = document.getElementById("apiEndpoint").value;
    chrome.storage.local.set({ apiEndpoint }, () => {
      console.log("API endpoint saved.");
    });
  });

  document.getElementById("model").addEventListener("input", () => {
    const model = document.getElementById("model").value;
    chrome.storage.local.set({ model }, () => {
      console.log("Model saved.");
    });
  });

  document.getElementById("toggleApiKey").addEventListener("click", () => {
    const apiKeyInput = document.getElementById("apiKey");
    const toggleButton = document.getElementById("toggleApiKey");
    if (apiKeyInput.type === "password") {
      apiKeyInput.type = "text";
      toggleButton.textContent = "Hide";
    } else {
      apiKeyInput.type = "password";
      toggleButton.textContent = "Show";
    }
  });
});
