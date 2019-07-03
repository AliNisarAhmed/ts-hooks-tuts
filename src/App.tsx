import React, { useState, MouseEventHandler } from "react";

type InputElem = React.ChangeEvent<HTMLInputElement>;
type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

const App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  function onValueChange(e: InputElem): void {
    setValue(e.target.value);
  }

  const addTodo = (text: string): void => {
    setTodoList(prev => [...prev, { text, complete: false }]);
  };

  function onFormSubmit(e: FormElem): void {
    e.preventDefault();
    addTodo(value);
    setValue("");
  }

  const onTodoClick = (index: number): MouseEventHandler => () => {
    setTodoList(prev =>
      prev.map((todo, i) =>
        i === index ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const removeTodo = (index: number): MouseEventHandler => () => {
    setTodoList(prev => prev.filter((todo, i) => (i === index ? false : true)));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={onFormSubmit}>
        <input type="text" required value={value} onChange={onValueChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {todoList.map((todoListItem, i) => (
          <li
            key={i}
            style={{
              textDecoration: todoListItem.complete ? "line-through" : "none"
            }}
          >
            {i + 1}: {todoListItem.text}
            <button onClick={onTodoClick(i)}>
              {todoListItem.complete ? "Undone" : "Done"}
            </button>
            <button onClick={removeTodo(i)}>X</button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default App;
