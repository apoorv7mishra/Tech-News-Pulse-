// API
const API_KEY = "3c7f67584eba4a24b858b09c403ea252";
const URL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${API_KEY}`;

// Data
let allNews = [];
let filteredNews = [];
let savedNews = JSON.parse(localStorage.getItem("saved")) || [];

// Elements
const newsContainer = document.getElementById("news-container");
const savedContainer = document.getElementById("saved-container");
const searchInput = document.getElementById("search");
const toggleBtn = document.getElementById("toggleMode");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");

  let mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);
};

async function fetchNews() {
  try {
    let res = await fetch(URL);
    let data = await res.json();

    allNews = data.articles;
    filteredNews = allNews;

    showNews(filteredNews);
  } catch (err) {
    console.log(err);
  }
}

function showNews(news) {
  newsContainer.innerHTML = "";

  news.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${item.urlToImage || 'https://via.placeholder.com/150'}">
      <h4>${item.title}</h4>
      <a href="${item.url}" target="_blank">Read More</a>
      <br>
      <button onclick="saveNews(${index})">Save</button>
    `;

    newsContainer.appendChild(div);
  });
}

function saveNews(index) {
  savedNews.push(filteredNews[index]);
  localStorage.setItem("saved", JSON.stringify(savedNews));

  showSaved();
}

function showSaved() {
  savedContainer.innerHTML = "";

  savedNews.forEach((item) => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${item.urlToImage || 'https://via.placeholder.com/150'}">
      <h4>${item.title}</h4>
      <a href="${item.url}" target="_blank">Read More</a>
    `;

    savedContainer.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  let value = searchInput.value.toLowerCase();

  filteredNews = allNews.filter(item =>
    item.title.toLowerCase().includes(value)
  );

  showNews(filteredNews);
});

function filterCategory(type) {
  if (type === "all") {
    filteredNews = allNews;
  } else {
    filteredNews = allNews.filter(item =>
      item.title.toLowerCase().includes(type)
    );
  }

  showNews(filteredNews);
}

fetchNews();
showSaved();