// Amogh Iyengar : Lab 4, Lab 7
const zipInput = document.getElementById("zip");
const zipMsg = document.getElementById("zip-msg");
const zipPattern = /^\d{5}$/;

zipInput.addEventListener("change", function () {
  const isValidZip = zipPattern.test(zipInput.value);
  console.log(zipInput.value, isValidZip);
  zipMsg.textContent = isValidZip ? "Valid ZIP" : "Invalid ZIP";
});

const name = "Ada";
let labsCompleted = 6;
let isEnrolled = false;
labsCompleted = labsCompleted + 1;
console.log(`${name} has completed ${labsCompleted} labs.`);

const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
let likes = 0;

likeBtn.addEventListener("click", function() {
  likes = likes + 1;
  likeCount.textContent = `${likes} likes`;
});

const themeBtn = document.querySelector("#theme-btn");
themeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark");
});