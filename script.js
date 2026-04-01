const API_KEY = "3c7f67584eba4a24b858b09c403ea252";
const API_URL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=20&apiKey=${API_KEY}`;

async function fetchNews() {
  const container = document.getElementById("news-container");

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${article.urlToImage || 'https://placehold.co/400x200/cccccc/333333?text=No+Image'}" alt="news image" />
        <h3>${article.title || "No title"}</h3>
        <p>${article.description || ""}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching news:", err);
    document.getElementById("news-container").textContent = "Failed to load news.";
  }
}

fetchNews();