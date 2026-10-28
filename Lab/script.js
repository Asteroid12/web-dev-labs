// Amogh Iyengar : Lab 4, Lab 7, Lab 8
const zipInput = document.getElementById("zip");
const zipMsg = document.getElementById("zip-msg");
const zipPattern = /^\d{5}$/;

zipInput.addEventListener("change", function () {
  const isValidZip = zipPattern.test(zipInput.value);
  console.log(zipInput.value, isValidZip);
  zipMsg.textContent = isValidZip ? "Valid ZIP" : "Invalid ZIP";
});

const name = "Ada";
let labsCompleted = 8;
let isEnrolled = false;
labsCompleted = labsCompleted + 1;
console.log(`${name} has completed ${labsCompleted} labs.`);

function getGreetingAfterDelay() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve("Hello from the future!");
    }, 800);
  });
}

async function showGreeting() {
  const message = await getGreetingAfterDelay();
  console.log(message);
}

showGreeting();

const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");

function updateLikeDisplay(count) {
  likeCount.textContent = `${count} likes`;
  if (count >= 10) {
    likeMessage.textContent = "Wow, thanks for all the likes!";
  } else if (count >= 5) {
    likeMessage.textContent = "Glad you like it!";
  } else {
    likeMessage.textContent = "";
  }
}

function createLikeCounter() {
  let likes = 0;  // private — not reachable from outside

  return {
    increment() {
      likes++;
      updateLikeDisplay(likes);
    },
    getLikes() {
      return likes;
    }
  };
}

const counter = createLikeCounter();

if (likeBtn) {
  likeBtn.addEventListener("click", function() {
    counter.increment();
  });
} else {
  console.warn("like-btn not found on this page");
}

const themeBtn = document.querySelector("#theme-btn");
themeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark");
});

const goals = ["Full stack web application development", "Modern Development and deployment practices", "API design and integration", "Git"];
const goalsList = document.querySelector("#goals-list");

goals.forEach(function(goal) {
  const item = document.createElement("li");
  item.textContent = goal;
  goalsList.appendChild(item);
});

const factBtn = document.querySelector("#fact-btn");
const factDisplay = document.querySelector("#fact-display");

async function loadFact() {
  factDisplay.textContent = "Loading...";
  try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
      throw new Error("Server responded with an error");
    }
    const data = await response.json();
    factDisplay.textContent = data.fact;
  } catch (error) {
    factDisplay.textContent = "Couldn't load a fact right now. Try again.";
    console.error(error);
  }
}

factBtn.addEventListener("click", loadFact);