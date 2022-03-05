const userInput = document.querySelector(".inputKey");
const submitButton = document.querySelector('.subButton');
const encButton = document.querySelector('.encButton0');
const decButton = document.querySelector('.decButton0');
const choose = document.querySelector(".choose");

const showVariants = () => {
  if ((userInput.value).replace(/[^a-z]/, '').toLowerCase() == "" ) {
    alert("Please input a keyword.");
  }
  else {
    choose.style.visibility = "visible";
  }
}

const displayEncryption = () => {
  window.sessionStorage.setItem("inputVal", userInput.value);
  window.location.href = "encrypt.html";
}

const displayDecryption = () => {
  window.sessionStorage.setItem("inputVal", userInput.value);
  window.location.href = "decrypt.html";
}

encButton.addEventListener("click", displayEncryption);
decButton.addEventListener("click", displayDecryption);
submitButton.addEventListener("click", showVariants);