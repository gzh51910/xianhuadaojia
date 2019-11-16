const express = require("express");
const Router = express.Router();
const { formatData } = require("../utils");
const { find, remove, update } = require("../db/mongodb");

const colName = "shop_car";

//查询所有数据
Router.get("/", async (req, res) => {
    let data = await find(colName);
    res.send(formatData({ data: data }));
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
    let { number } = req.body;
    let data = await update(colName, { _id: id }, { number });
    if (data.modifiedCount > 0) {
        res.send(formatData());
    } else {
        res.send(formatData({ status: 0 }));
    }
});

module.exports = Router;