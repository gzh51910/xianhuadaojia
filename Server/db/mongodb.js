//引入MongoDB通过解构获取MongoDB的MongoClient模块;
const { MongoClient, ObjectId } = require("mongodb");
const { dburl, dbName } = require("../config.json");

//数据库连接函数
async function connect() {
	//通过MongoClient连接MongoDB数据库
	const client = await MongoClient.connect(dburl);
	//通过Client下面的DB方法连接数据表格
	const db = client.db(dbName);
	return { client, db };
}

// 查找函数
async function find(colName, query = {}, options = {}) {
	//筛选条件
	let { fields, skip, limit, sort } = options;
	//连接数据库
	let { client, db } = await connect();
	//获取数据集合
	let collection = db.collection(colName);
	//把ID转成mongodb数据库ID的格式
	if (query._id && typeof query._id === "string") {
		query._id = ObjectId(query._id);
	}
	//执行查询语句  query：查询条件{fields}
	console.log(query);
	
	let data = await collection.find(query, { fields });
	//跳过数量
	if (skip) {
		data = data.skip(skip);
	}
	//限制数量
	if (limit) {
		data = data.limit(limit * 1);
	}
	//排序 1 == 升序  -1 == 降序
	if (sort) {
		let arr = sort.split(",");
		let key = arr[0];
		let value = arr[1] ? arr[1] * 1 : -1;
		data = data.sort({
			[key]: value
		});
	}
	data = data.toArray();
	//关闭数据库
	client.close();
	return data;
}

//增加数据
async function create(colName, data) {
	let { client, db } = await connect();
	let collection = db.collection(colName);
	if (!Array.isArray(data)) {
		data = [data];
	}
	let result = await collection.insertMany(data);
	client.close();
	return result;
}

//删除数据
async function remove(colName, query) {
	const { db, client } = await connect();
	let collection = db.collection(colName);

	if (query._id && typeof query._id === "string") {
		query._id = ObjectId(query._id);
	}
	let result = await collection.deleteMany(query);

	client.close();

	return result;
}

//更新数据
async function update(colName, query, data) {
	const { db, client } = await connect();
	let collection = db.collection(colName);

	if (query._id && typeof query._id === "string") {
		query._id = ObjectId(query._id);
	}

	let result = await collection.updateMany(query, { $set: data });

	client.close();
	return result;
}

module.exports = { find, create, remove, update };
