import { useState } from "react";
import { nanoid } from "nanoid";
import Example from "src/components/Example";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

function getRandomNum() {
  // 1 to 10
  return Math.floor(Math.random() * 10) + 1;
}

export default function UseStateChange() {
  const [randomNum, setRandomNum] = useState(() => getRandomNum()); // computing initial state

  const [user, setUser] = useState({
    name: "user 1",
    age: 23,
    luckyNum: randomNum,
  }); // initial state

  const [task, setTask] = useState(""); // initial state
  const [todos, setTodos] = useState<Todo[]>([]); // initial state

  function handleGenerateRandomNum() {
    setRandomNum(getRandomNum());
  }

  function handleUser() {
    setUser((prevState) => ({ ...prevState, luckyNum: randomNum }));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.currentTarget.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task.trim() === "") return;

    setTodos((prevState) => [
      ...prevState,
      { id: nanoid(), text: task, isCompleted: false },
    ]);

    setTask("");
  }

  return (
    <Example
      hasNestedComp={false}
      title="State change for primitive and non-primitive"
    >
      <div>
        <button onClick={handleGenerateRandomNum}>
          Generate Random Number
        </button>
        <span>: {randomNum}</span>
      </div>

      <div>
        <button onClick={handleUser}>Set Lucky Number for {user.name}</button>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <div>
        <h4>Set Todos</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" value={task} onChange={handleInputChange} />
          <button type="submit">Add</button>
        </form>

        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </div>
    </Example>
  );
}