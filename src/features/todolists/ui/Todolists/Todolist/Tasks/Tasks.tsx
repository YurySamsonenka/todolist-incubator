import List from "@mui/material/List"
import { TodolistType } from "../../../../../../app/App"
import { Task } from "./Task/Task"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "../../../../model/tasksSelectors"

type Props = {
  todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((t) => {
            return <Task task={t} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
