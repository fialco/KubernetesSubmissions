import { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([]);
  const baseUrl = "/api";

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(`${baseUrl}/todos`);
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    console.log(`Adding todo: ${todo}`);
    const res = await axios.post(`${baseUrl}/todos`, { todo });
    setTodos((prev) => [...prev, res.data]);
  };

  return (
    <>
      <h1>The Project App</h1>
      <img src="api/image" alt="" width={400} height={400} />
      <TodoForm createTodo={addTodo} />

      {todos && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      )}

      <p>DevOps with Kubernetes 2025</p>
    </>
  );
};

export default App;
