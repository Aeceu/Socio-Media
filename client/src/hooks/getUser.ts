import axios from "axios";

export default async function getUser() {
  const res = await axios.get("http://localhost:3001/userdata");

  return res.data.data;
}
