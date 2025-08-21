require("dotenv").config({ path: "./database/dbConfig.env" });
const express = require("express");
const app = express();
const port = 3000;

console.log(process.env.DB_NAME);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

app.get("/hello", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});
//라우터 추가하는방법
app.get("/api/board", (req, res) => {
  res.send({ title: "노드 api 서버 update!!!!" });
});
// vue.js build 이후

const path = require("path");
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});
//에러처리기반 라우터연결,위 서버경로 x -> index.html.,새로고침해도 현페이지 유지
//자기 위 경로 말고 404인식 가장 밑 존재 -> 밑 녀석들은 x
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./public", "index.html"));
});
