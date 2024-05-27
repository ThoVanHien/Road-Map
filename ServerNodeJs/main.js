// Import mô-đun http
const http = require("http");

// Hàm xử lý các request
const requestHandler = (req, res) => {
  // Thiết lập header
  res.writeHead(400, { "Content-Type": "text/plain" });

  // Kiểm tra URL của request
  if (req.url === "/") {
    res.write("Hello, World!");
  } else if (req.url === "/about") {
    res.write("About Us");
  } else {
    res.write("404 Not Found");
  }

  // Kết thúc response
  res.end();
};

// Tạo server
const server = http.createServer(requestHandler);

// Server lắng nghe trên cổng 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
