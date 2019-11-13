const express = require("express");

const Router = express.Router();
const { formatData, token } = require("../utils");
const { find } = require("../db/mongodb");

const colName = "user";

//查询所有数据
Router.get("/", async (req, res) => {
	let { username, password } = req.query;
	let data = await find(colName, { username, password });
	if (data.length > 0) {
		let Authorization = token.create({ username });
		res.send(formatData({ data: Authorization }));
	} else {
		res.send(formatData({ status: 0 }));
	}
});

module.exports = Router;
