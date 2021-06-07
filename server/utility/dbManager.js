const { connection } = require("../DBCon");

const ReadData = (query, params) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(query, params, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const InsertOrUpdateData = (query, params) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(query, params, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  ReadData,
  InsertOrUpdateData,
};
