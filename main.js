import { catsData } from "./data.js";

const emotionSelector = document.getElementById("emotion-selector");
const gifsOnlyCheckbox = document.getElementById("gifs-only-checkbox");
const memeModal = document.getElementById("meme-modal");
const memeModalImageContainer = document.getElementById(
  "meme-modal-image-container",
);
const elementsThatShouldNotCloseMemeModal = new Set();
elementsThatShouldNotCloseMemeModal.add("meme-modal");
elementsThatShouldNotCloseMemeModal.add("get-image-btn");
elementsThatShouldNotCloseMemeModal.add("meme-modal-image-container");
elementsThatShouldNotCloseMemeModal.add("meme-modal-img");

document.getElementById("get-image-btn").addEventListener("click", renderCat);
document.getElementById("html").addEventListener("click", closeModal);
renderEmotionsSelectorOptions();

function closeModal(event) {
  if (!elementsThatShouldNotCloseMemeModal.has(event.target.id)) {
    memeModal.style.display = "none";
  }
}

function renderCat(event) {
  const randomCat = getRandomCatObject();
  memeModalImageContainer.innerHTML = `<img id="meme-modal-img" src="./images/${randomCat.image}" alt="${randomCat.alt}"/>`;
  memeModal.style.display = "block";
}

function getRandomCatObject() {
  const matchingCats = getMatchingCats();
  if (matchingCats.length === 1) {
    return matchingCats[0];
  } else {
    const randomIndex = Math.floor(Math.random() * matchingCats.length);
    return matchingCats[randomIndex];
  }
}

function getMatchingCats() {
  const isGifsOnly = gifsOnlyCheckbox.checked;
  const selectedEmotion = emotionSelector.value;
  if (isGifsOnly) {
    return catsData.filter((cat) => {
      return cat.isGif && cat.emotionTags.includes(selectedEmotion);
    });
  } else {
    return catsData.filter((cat) => {
      return cat.emotionTags.includes(selectedEmotion);
    });
  }
}

function getAllDifferentEmotionsSet() {
  const emotions = new Set();
  for (const cat of catsData) {
    for (const tag of cat.emotionTags) {
      emotions.add(tag);
    }
  }
  return emotions;
}

function renderEmotionsSelectorOptions() {
  const emotions = getAllDifferentEmotionsSet();
  let emotionOptionsHTMLString = "";
  for (const emotion of emotions) {
    emotionOptionsHTMLString += `
      <option value="${emotion}">${emotion}</option>
    `;
  }
  emotionSelector.innerHTML = emotionOptionsHTMLString;
}
