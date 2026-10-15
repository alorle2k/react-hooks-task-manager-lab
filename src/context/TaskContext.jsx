import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext(null);
const API_URL = "http://localhost:6001/tasks";

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Load tasks from the backend when the component mounts.
  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        const data = await response.json();

        setTasks(
          data.map((task) => ({
            ...task,
            title: task.title ?? task.text,
            text: task.title ?? task.text,
          }))
        );
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }

    loadTasks();
  }, []);

  // Add a new task.
  async function addTask(value) {
    const title = value.trim();

    if (!title) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const savedTask = await response.json();

      setTasks((previousTasks) => [
        ...previousTasks,
        {
          ...savedTask,
          title: savedTask.title ?? savedTask.text,
          text: savedTask.title ?? savedTask.text,
        },
      ]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // Toggle a task's completion status.
  async function toggleTask(taskId) {
    const task = tasks.find(
      (item) => String(item.id) === String(taskId)
    );

    if (!task) return;

    const completed = !task.completed;

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        String(item.id) === String(taskId)
          ? { ...item, completed }
          : item
      )
    );

    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);

      // Restore the previous state if saving fails.
      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          String(item.id) === String(taskId)
            ? { ...item, completed: task.completed }
            : item
        )
      );
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        toggleComplete: toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}