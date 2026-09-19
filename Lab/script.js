// Amogh Iyengar : Lab 4 - Grad Extension
const zipInput = document.getElementById("zip");
const zipMsg = document.getElementById("zip-msg");
const zipPattern = /^\d{5}$/;

zipInput.addEventListener("change", function () {
  const isValidZip = zipPattern.test(zipInput.value);
  console.log(zipInput.value, isValidZip);  // true or false
  zipMsg.textContent = isValidZip ? "Valid ZIP" : "Invalid ZIP";
});