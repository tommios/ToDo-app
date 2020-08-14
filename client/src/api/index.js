import axios from "axios";

export function getAllTodo() {
  return axios.get("http://localhost:8000/todos");
}
