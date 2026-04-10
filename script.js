const API_URL = "http://localhost:3000/api/news";

let allArticles = [];

async function fetchNews() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    
    if (!res.ok || data.status === "error") {
      throw new Error(data.message || `API Error: ${res.status}`);
    }
    
    if (!data.articles || data.articles.length === 0) {
      throw new Error("No articles found");
    }
    
    allArticles = data.articles;
    displayNews(allArticles);
  } catch (err) {
    console.error("Error fetching news:", err);
    document.getElementById("news-container").textContent = `Failed to load news: ${err.message}`;
  }
}

function displayNews(articles) {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  articles.forEach((article, index) => {
    const isLiked = localStorage.getItem(`article-${index}`) === "true";
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://placehold.co/400x200/cccccc/333333?text=No+Image'}" alt="news image" />
      <h3>${article.title || "No title"}</h3>
      <p>${article.description || ""}</p>
      <div class="card-actions">
        <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${index})">❤️ Like</button>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;

    container.appendChild(card);
  });
}

function searchNews() {
  const query = document.getElementById("search-box").value.toLowerCase();
  if (query === "") {
    displayNews(allArticles);
    return;
  }
  const filtered = allArticles.filter(article =>
    article.title.toLowerCase().includes(query) ||
    article.description.toLowerCase().includes(query)
  );
  displayNews(filtered);
}

function toggleLike(index) {
  const isLiked = localStorage.getItem(`article-${index}`) === "true";
  localStorage.setItem(`article-${index}`, !isLiked);
  displayNews(allArticles);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

fetchNews();