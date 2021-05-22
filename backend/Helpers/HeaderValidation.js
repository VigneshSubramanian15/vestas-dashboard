module.exports = function (req, res, next) {
  console.log("token");
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access Denied!");
  }

  try {
    token === process.env.HEADERS_TOKEN
      ? next()
      : res.status(401).send("Access Denied!");
  } catch (e) {
    return res.status(403).send({ message: "token expired" });
  }
};
