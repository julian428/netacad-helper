const data = {
  "Which tasks can be accomplished by using the command history feature? (Choose two.)":
    "Set the command history buffer size && Recall previously entered commands.",
};

document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("searchButton");
  var questionInput = document.getElementById("questionInput");

  searchButton.addEventListener("click", function () {
    var question = questionInput.value.trim();
    if (question !== "") {
      const answer = data[question];
      alert(answer);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "searchAnswer",
          question: question,
        });
      });
    } else {
      alert("Please enter a question.");
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "displayAnswer") {
    alert("Answer: " + request.answer);
  }
});
