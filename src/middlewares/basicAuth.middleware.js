import UserModel from "../features/user/user.model.js";
export default function basicAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  try {
    if (!authHeader) {
      return res.status(401).send({ msg: "Unauthorized User" });
    }
    const base64credentials = authHeader.replace("Basic", "").trim();

    const decodeCredentials = Buffer.from(base64credentials, "base64").toString(
      "utf-8"
    );
    const creds = decodeCredentials.split(":");
    const user = UserModel.getAll().find(
      (u) => u.email == creds[0] && u.password == creds[1]
    );
    if (!user) {
      return res.status(400).send({ msg: "Invalid Credentials" });
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
}
