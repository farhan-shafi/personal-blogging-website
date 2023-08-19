import fs from "fs";
import path from "path";
import { compare, hash } from "bcryptjs";

const filePath = path.join(process.cwd(), "src", "data", "blogs.json");

export function getAllBlogs() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export function getBlogByEmail(email) {
  const data = getAllBlogs();
  return data.find((b) => b.email.toLowerCase() === email.toLowerCase());
}

export async function saveBlog(email, title, body) {
  const data = getAllBlogs();

  const found = getBlogByEmail(email);
  if (found) {
    found.blogs.push({ title, body });
  } else {
    data.push({
      email,
      blogs: [{ title, body }],
    });
  }

  fs.writeFileSync(filePath, JSON.stringify(data));
}
