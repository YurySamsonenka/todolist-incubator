import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { FilterValues, TodolistType } from "../../../../../../app/App"
import { changeTodolistFilterAC } from "../../../../model/todolists-reducer"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type Props = {
  todolist: TodolistType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ filter, id: todolist.id }))
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
