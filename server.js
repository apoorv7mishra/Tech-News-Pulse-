const http = require("http");
const https = require("https");

const API_KEY = "3c7f67584eba4a24b858b09c403ea252";
const API_URL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=20&apiKey=${API_KEY}`;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/api/news" && req.method === "GET") {
    https
      .get(API_URL, (apiRes) => {
        let data = "";
        apiRes.on("data", (chunk) => (data += chunk));
        apiRes.on("end", () => {
          res.writeHead(apiRes.statusCode);
          res.end(data);
        });
      })
      .on("error", (err) => {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
