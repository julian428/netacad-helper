// Define your array of objects with questions and answers
var data = [
  { question: "What is your name?", answer: "My name is ChatGPT." },
  {
    question: "How does photosynthesis work?",
    answer:
      "Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy.",
  },
];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "searchAnswer") {
    var foundAnswer = "Sorry, I don't have an answer for that question.";

    for (var i = 0; i < data.length; i++) {
      if (data[i].question.toLowerCase() === request.question.toLowerCase()) {
        foundAnswer = data[i].answer;
        break;
      }
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "displayAnswer",
        answer: foundAnswer,
      });
    });
  }
});
