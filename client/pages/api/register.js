import User from "../../models/user";
import dbConnect from "../../config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect();

    const { name, email, password } = req.body;

    const userId = await User.createUser(name, email, password); //使用者註冊,把表單裡的元素,呼叫api,並傳入資料庫

    res.status(201).json({ user: { id: userId, name, email } });
  }
}
