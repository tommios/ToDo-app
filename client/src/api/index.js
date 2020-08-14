import axios from "axios";

function getAllTodo() {
  return axios.get("http://localhost:8000/todos");
}

export { getAllTodo };
