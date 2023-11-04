const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath;
  if (req.url === "/") {
    filePath = path.join(__dirname, "/index.html");
  } else if (req.url === "/about.html") {
    filePath = path.join(__dirname, "/about.html");
  } else if (req.url === "/contact-me.html") {
    filePath = path.join(__dirname, "/contact-me.html");
  } else {
    // Ha a fájl nem található, küldj vissza egy 404 választ.
    filePath = path.join(__dirname, "/404.html");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Ha a fájl nem található, küldj vissza egy 404 választ.
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(fs.readFileSync(path.join(__dirname, "/404.html")));
      } else {
        // Egyéb hibák esetén küldj vissza egy 500-as (Internal Server Error) választ.
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("Internal Server Error");
      }
    } else {
      // Sikeres olvasás esetén küldj vissza az olvasott fájlt.
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`A szerver fut a ${port}-es porton.`);
});
