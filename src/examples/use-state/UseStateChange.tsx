import { useState } from "react";
import { nanoid } from "nanoid";
import Example from "src/components/Example";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

// 1 to 10
function getRandomNum() {
  return Math.floor(Math.random() * 10) + 1;
}

function getRandomId() {
  return Math.random().toString(36).substring(2);
}

function Todos() {
  const [task, setTask] = useState(""); // initial state
  const [todos, setTodos] = useState<Todo[]>([]); // initial state

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // setting next state
    setTask(event.currentTarget.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task.trim() === "") return;

    // setting next state
    setTodos([...todos, { id: nanoid(), text: task, isCompleted: false }]);
    setTask("");
  }

  return (
    <div className="mb-2">
      <h4>Set Todos</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleInputChange} />
        <button type="submit">Add</button>
      </form>

      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}

export default function UseStateChange() {
  const [randomNumAndId, setRandomNumAndId] = useState(() => ({
    num: getRandomNum(),
    id: getRandomId(),
  })); // updater function computing initial state

  const [user, setUser] = useState({
    name: "user 1",
    age: 23,
    luckyNum: randomNumAndId.num,
    car: {
      id: randomNumAndId.id,
      brand: "BMW",
      model: "X5",
    },
  }); // initial state

  const [resetCompKey, setResetCompKey] = useState(0); // initial state

  function handleGenerateRandomNumAndId() {
    // setting next state
    setRandomNumAndId({
      ...randomNumAndId,
      num: getRandomNum(),
      id: getRandomId(),
    });
  }

  function handleUser() {
    // updater function setting next state
    setUser({
      ...user,
      luckyNum: randomNumAndId.num,
      car: { ...user.car, id: randomNumAndId.id },
    });
  }

  function handleReset() {
    setResetCompKey(resetCompKey + 1);
  }

  return (
    <Example
      hasNestedComp={false}
      title="State change for primitive and non-primitive"
    >
      <div className="mb-2">
        <button onClick={handleGenerateRandomNumAndId}>
          Generate Random Number and Id
        </button>
        <br />
        <p>
          <b>Random Num</b>: {randomNumAndId.num}
        </p>
        <p>
          <b>Random Id</b>: {randomNumAndId.id}
        </p>
      </div>

      <hr />

      <div className="mb-2">
        <button onClick={handleUser}>
          Set Lucky Number & ID for {user.name}
        </button>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>

      <hr />
      <Todos key={resetCompKey} />

      <hr />

      <div className="mb-2">
        <button onClick={handleReset}>Reset Set Todos Component</button>
      </div>
    </Example>
  );
}
