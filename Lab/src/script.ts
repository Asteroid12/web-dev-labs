// Amogh Iyengar — Lab 4, Lab 7, Lab 8, Lab 9, Lab 10, Lab 11

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

const zipInput = document.getElementById("zip") as HTMLInputElement;
const zipMsg = document.getElementById("zip-msg") as HTMLSpanElement;
const zipPattern: RegExp = /^\d{5}$/;

zipInput.addEventListener("change", function () {
  const isValidZip: boolean = zipPattern.test(zipInput.value);
  console.log(zipInput.value, isValidZip);
  zipMsg.textContent = isValidZip ? "Valid ZIP" : "Invalid ZIP";
});

const studentName: string = "Ada";
let labsCompleted: number = 10;
let isEnrolled: boolean = false;
labsCompleted = labsCompleted + 1;
console.log(`${studentName} has completed ${labsCompleted} labs.`);

function getGreetingAfterDelay(): Promise<string> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Hello from the future!");
    }, 800);
  });
}

async function showGreeting(): Promise<void> {
  const message: string = await getGreetingAfterDelay();
  console.log(message);
}

showGreeting();

const likeBtn = document.querySelector("#like-btn") as HTMLButtonElement | null;
const likeCount = document.querySelector("#like-count") as HTMLParagraphElement;
const likeMessage = document.querySelector("#like-message") as HTMLParagraphElement;

function updateLikeDisplay(count: number): void {
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
  let likes: number = Number(localStorage.getItem("likes")) || 0;

  return {
    increment(): void {
      likes++;
      localStorage.setItem("likes", likes.toString());
      updateLikeDisplay(likes);
    },
    getLikes(): number {
      return likes;
    }
  };
}

const counter = createLikeCounter();
updateLikeDisplay(counter.getLikes());

if (likeBtn) {
  likeBtn.addEventListener("click", function () {
    counter.increment();
  });
} else {
  console.warn("like-btn not found on this page");
}

const themeBtn = document.querySelector("#theme-btn") as HTMLButtonElement;
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  const isDark: boolean = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const goals: string[] = ["Full stack web application development", "Modern Development and deployment practices", "API design and integration", "Git"];
const goalsList = document.querySelector("#goals-list") as HTMLUListElement;

goals.forEach(function (goal: string) {
  const item = document.createElement("li");
  item.textContent = goal;
  goalsList.appendChild(item);
});

const factBtn = document.querySelector("#fact-btn") as HTMLButtonElement;
const factDisplay = document.querySelector("#fact-display") as HTMLParagraphElement;

interface CatFact {
  fact: string;
  length: number;
}

async function loadFact(): Promise<void> {
  factDisplay.textContent = "Loading...";
  try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
      throw new Error("Server responded with an error");
    }
    const data = (await response.json()) as CatFact;
    factDisplay.textContent = data.fact;
    saveToStorage<CatFact>("lastFact", data);
  } catch (error) {
    factDisplay.textContent = "Couldn't load a fact right now. Try again.";
    console.error(error);
  }
}

factBtn.addEventListener("click", loadFact);

const locationBtn = document.querySelector("#location-btn") as HTMLButtonElement;
const locationDisplay = document.querySelector("#location-display") as HTMLParagraphElement;

locationBtn.addEventListener("click", function () {
  if (!("geolocation" in navigator)) {
    locationDisplay.textContent = "Geolocation isn't supported.";
    return;
  }

  navigator.geolocation.getCurrentPosition(function (position: GeolocationPosition) {
    const lat: string = position.coords.latitude.toFixed(2);
    const lon: string = position.coords.longitude.toFixed(2);
    locationDisplay.textContent = `You're near ${lat}, ${lon}`;
  }, function (error: GeolocationPositionError) {
    locationDisplay.textContent = "Location access was denied.";
    console.warn(error);
  });
});

function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

saveToStorage<number>("savedLikes", counter.getLikes());
const loadedLikes = loadFromStorage<number>("savedLikes");
console.log("Generic with number:", loadedLikes, typeof loadedLikes);

const lastFact = loadFromStorage<CatFact>("lastFact");
if (lastFact) {
  console.log("Generic with cat fact:", lastFact.fact, `(${lastFact.length} characters)`);
} else {
  console.log("Generic with cat fact: no fact saved yet - click Get a Random Fact, then reload");
}