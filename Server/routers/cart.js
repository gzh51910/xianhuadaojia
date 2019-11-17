const express = require("express");
const Router = express.Router();
const { formatData } = require("../utils");
const { find, remove, update, create } = require("../db/mongodb");

const colName = "shop_car";

//查询所有数据
Router.get("/", async (req, res) => {
    let data = await find(colName, req.query);
  let arr = [];
  for (let item in data) {
      let goods = await find("all", { gid: data[item].goodsid });
      goods[0].qty = data[item].pty
      arr.push(goods[0])
    }
    let datagoods = arr.reverse()
    res.send(formatData({ data: datagoods }));
});

//删除某个商品
Router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let data = await remove(colName, { _id: id });
  if (data.deletedCount > 0) {
    res.send(formatData());
  } else {
    res.send(formatData({ status: 0 }));
  }
});

//更新某个商品
Router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let data = await update(colName, { _id: id }, req.body);
  if (data.modifiedCount > 0) {
    res.send(formatData());
  } else {
    res.send(formatData({ status: 0 }));
  }
});

//添加一个商品
Router.post("/", async (req, res) => {
  let data = await create(colName, req.body);
  if (data.insertedCount > 0) {
    res.send(formatData());
  } else {
    res.send(
      formatData({
        status: 0
      })
    );
  }
});

module.exports = Router;
