import { useState } from "react"; import { useTasks } from "../context/TaskContext"; import TaskForm from "./TaskForm"; import SearchBar from "./SearchBar";

function App() { const { tasks, toggleTask } = useTasks(); const [searchTerm, setSearchTerm] = useState("");

const filteredTasks = tasks.filter((task) => (task.title ?? task.text ?? "") .toLowerCase() .includes(searchTerm.toLowerCase()) );

return ( <div> <h1>Task Manager</h1>

<TaskForm />

<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

<ul> {filteredTasks.map((task) => ( <li key={task.id}> <label> <input type="checkbox" data-testid={String(task.id)} checked={task.completed} onChange={() => toggleTask(task.id)} />

<span style={{ textDecoration: task.completed ? "line-through" : "none", }} > {task.title ?? task.text} </span> </label>

{task.completed && ( <button onClick={() => toggleTask(task.id)}> Undo </button> )} </li> ))} </ul> </div> ); }

export default App;