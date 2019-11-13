const express = require("express");
const { formatData } = require("../utils");
const Router = express.Router();

const { create } = require("../db/mongodb");

const colName = "user";
Router.post("/", async (req, res) => {
	let { username, password } = req.body;
	let data = await create(colName, { username, password });
	if (data.insertedCount > 0) {
		res.send(formatData());
	} else {
		res.send(formatData({ status: 0 }));
	}
});

module.exports = Router