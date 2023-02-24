'use strict';

const inputField = document.getElementById("input");

inputField.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let input = inputField.value;
    inputField.value = "";
    output(input);
  }
});

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
  .replace(/ a /g, " ")
  .replace(/whats/g, "what is")
  .replace(/please /g, "")
  .replace(/ please/g, "");

  if (compare(utterances, answers, text)) {
    product = compare(utterances, answers, text);
  } else {
    product = alternatives[Math.floor(Math.random() *alternatives.length)];
  }

  //update DOM
  addChatEntry (input, product);
}

function compare(utterancesArray, answersArray, string) {
  let reply = '';
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        }
      }
  }

  return reply;
}

const utterances = [
    ["how are you", "how is life", "how are things"],//0
    ["hi", "hey", "hello", "good morning", "good afternoon"], //1
    ["what are you doing", "what is going on", "what is up"], //2
    ["how old are you"],//3
    ["who are you", "are you human", "are you bot", "are you human or bot"],//4
    ["what time is it", "what time is it now"],//5
    ["what day is it", "what day is it today", "what date is today", "what day is today"]//6
];

// Possible responses corresponding to triggers
const date = new Date();
const time = date.toLocaleTimeString().slice(0,-3);
const day = date.toDateString();
const answers = [
    [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
    ],//0
    [
    "Hello!", "Hi!", "Hey!", "Hi there!"
    ],//1
    [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
    ],//2
    ["I am infinite"],//3
    ["I am just a bot", "I am a bot. What are you?"],//4
    [time], //5
    [day]//6
];

// For any other user input
const alternatives = ["Go on...", "Try again"];

function addChatEntry(input, product) {
  const messagesContainer = document.querySelector(".messages");

  let userDiv = document.createElement("div");
  userDiv.className = "user response";
  userDiv.innerHTML = `${input}`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000);
}
