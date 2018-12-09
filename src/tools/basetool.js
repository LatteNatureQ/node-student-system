//导入mongodb模块
const MongoClient = require('mongodb').MongoClient;
// 链接 URL
const url = 'mongodb://localhost:27017';
// 数据库名称
const dbName = 'szhmqd25';
//mongodb ID封装
const ObjectID = require('mongodb').ObjectID;
exports.findId = (id) => {
    return ObjectID(id)
}
//抽取公共样式
const getFn = (name, callback) => {
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            const db = client.db(dbName);
            const collection = db.collection(name);
            callback(collection, client)
        })
}

//查询一条数据封装
exports.findSingle = (name, data, callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(name);
        collection.findOne(data, (err, result) => {
            client.close()
            callback(err, result)
        })
    });
}
//新增一条数据封装
exports.insertSingle = (name, data, callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(name);
        collection.insertOne(data, (err, result) => {
            client.close()
            callback(err, result)
        })
    });
}
//查询多条数据封装
exports.findAll = (name, data, callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(name);
        collection.find(data).toArray((err, result) => {
            callback(err, result)
            client.close()
        })
    });
}
//更新一条数据封装
exports.updateSingle = (name, data, data1, callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(name);
        collection.updateOne(data, data1, (err, result) => {
            client.close()
            callback(err, result)
        })
    });
}
//删除一条数据封装
exports.delSingle = (name, data, callback) => {
    getFn(name, (collection, client) => {
        collection.deleteOne(data, (err, result) => {
            client.close()
            callback(err, result)
        })
    })
}