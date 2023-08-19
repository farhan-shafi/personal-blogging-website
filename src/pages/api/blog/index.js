import { saveBlog } from "@/services/blog";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).send();
  }
  const { email, title, body } = req.body;
  try {
    saveBlog(email, title, body);
    res.status(201).send();
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
