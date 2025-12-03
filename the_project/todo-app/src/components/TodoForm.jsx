import { useState } from "react";

const TodoForm = ({ createTodo }) => {
  const [todo, setTodo] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    createTodo(todo);
    setTodo("");
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={todo}
          maxLength="140"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button type="submit">Create todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
