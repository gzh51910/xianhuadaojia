const express = require("express");

const Router = express.Router();
const {
  formatData
} = require("../utils");
const {
  find,
  create
} = require("../db/mongodb");

const colName = "all";


//查询某种类型
Router.get("/ddd", async (req, res) => {
  let {
    query
  } = req.query;
  let classification = {
    classification: query
  };
  let data = await find(colName, classification);
  res.send(formatData({
    data: data
  }));
});


//通过gid查找
Router.get("/id", async (req, res) => {
  let {
    id
  } = req.query;
  let data = await find(colName, {
    gid: id
  });
  res.send(formatData({
    data: data
  }));
});

//通过id查找
Router.get("/:id", async (req, res) => {
  let {
    id
  } = req.params;
  let data = await find(colName, {
    _id: id
  });
  res.send(formatData({
    data: data
  }));
});


module.exports = Router;