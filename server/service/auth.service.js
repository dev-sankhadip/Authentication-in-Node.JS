const DBManager = require("../utility/dbManager");
const authUtility = require("../utility/auth");

const login = (_request, _response, next) => {
  try {
    const { userId, password } = _request.body;
    const ipAddress = _request.ip;

    const aToken = authUtility.generateJWTToken(userId);
    const refreshToken = authUtility.generateRefreshToken(userId, ipAddress);

    let query = "Select * from tbl_User where user = ? and password = ?";
    DBManager.ReadData(query, [userId, password])
      .then((result) => {
        if (result.length == 0) {
          _response.status(404).send({ message: "Username or Password is incorrect" });
          return;
        }
        query = "Insert Into tbl_Token(token, expires, createdByIp, user) values(?,?,?,?)";
        DBManager.InsertOrUpdateData(query, [...Object.values(refreshToken), userId])
        .then((result) => {
          _response.status(200).send({ ...refreshToken, aToken });
        })
        .catch((err) => {
          _response.status(500).send( err );
        });
      })
      .catch((err) => {
        _response.status(500).send( err );
      });
  } catch (err) {
    _response.status(500).send( err );
  }
};

const refreshToken = (_req, _res, next) => {
  try {
    const { rtoken } = _req.headers;
    const ipAddress = _req.ip;

    let query = "Select * from tbl_Token Where Token = ? and expires > CURRENT_TIMESTAMP and revokedOn IS NULL";
    DBManager.ReadData(query, [rtoken])
    .then((result)=>
    {
      if(result.length == 0) {
        _res.status(401).send({ message:"Invalid token" });
        return;
      }
      const { user:userId } = result[0];
      const aToken = authUtility.generateJWTToken(userId);
      const refreshToken = authUtility.generateRefreshToken(userId, ipAddress);
      query = "Update tbl_Token set revokedOn = CURRENT_TIMESTAMP, revokedByIp = ?, replacedByToken = ? Where token = ?";
      DBManager.InsertOrUpdateData(query, [ipAddress, refreshToken.rToken, rtoken])
        .then((res) => {
          query = "Insert Into tbl_Token(token, expires, createdByIp, user) values(?,?,?)";
          DBManager.InsertOrUpdateData(query, [...Object.values(refreshToken). userId])
            .then((result) => {
              _res.status(200).send({ ...refreshToken, aToken });
            })
            .catch((err) => {
              _res.status(500).send( err );
            });
        })
        .catch((err) => {
          _res.status(500).send(err);
        });
    })
    .catch((err)=>{
      _res.status(500).send(err);
    })
  } catch (error) {
    _res.status(500).send(error);
  }
};

module.exports = {
  login,
  refreshToken,
};
