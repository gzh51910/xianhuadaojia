const express = require("express");

const Router = express.Router();
const { formatData } = require("../utils");
const { find, remove, update } = require("../db/mongodb");

const colName = "user";

//查询所有数据
Router.get("/", async (req, res) => {
	let data = await find(colName);
	res.send(formatData({ data: data }));
});

//查询单个用户
Router.get("/:id", async (req, res) => {
	let { id } = req.query;
	let data = await find(colName, { _id: id }, { fields: { password: false } });
	res.send(formatData({ data: data }));
});

//删除某个用户
Router.delete("/:id", async (req, res) => {
	let { id } = req.params;
	let data = await remove(colName, { _id: id });
	if (data.deletedCount > 0) {
		res.send(formatData());
	} else {
		res.send(formatData({ status: 0 }));
	}
});

//更新用户
Router.patch("/:id", async (req, res) => {
	let { id } = req.params;
	let { password, age, gender } = req.body;
	let data = await update(colName, { _id: id }, { password, age, gender });
	if (data.modifiedCount > 0) {
		res.send(formatData());
	} else {
		res.send(formatData({ status: 0 }));
	}
});

module.exports = Router;
