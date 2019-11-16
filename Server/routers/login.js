const express = require("express");

const Router = express.Router();
const { formatData, token } = require("../utils");
const { find } = require("../db/mongodb");

const colName = "user";

//查询账号密码
Router.get("/", async (req, res) => {
  let { username, password } = req.query;
  let data = await find(colName, { username, password });
  if (data.length > 0) {
    let Authorization = token.create({ username });
    res.set({
      "Access-Control-Expose-Headers": "Authorization",
      Authorization: Authorization
    });
    res.send(formatData({ data }));
  } else {
    res.send(formatData({ status: 0 }));
  }
});

module.exports = Router;
