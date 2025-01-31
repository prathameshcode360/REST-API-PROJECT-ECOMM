import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ msg: "unauthorized user" });
  }
  try {
    const payload = jwt.verify(token, "RyHNTbfn8j7InkOJartrslNgkGdCxPWu");
    req.usrId = payload.usrId;
  } catch (err) {
    return res.status(401).send({ msg: "unauthorized user" });
  }
  next();
}
