import { useState, useId } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const taskInputId = useId();
  const { addTask } = useTasks();

  function handleSubmit(e) {
    e.preventDefault();

    if (taskName.trim() === "") return;

    addTask(taskName.trim());
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={taskInputId}>New Task:</label>

      <input
        id={taskInputId}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
