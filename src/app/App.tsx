import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme/theme"
import Header from "../common/components/Header/Header"
import { Main } from "./Main"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"

export type TasksStateType = {
  [key: string]: TaskType[]
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValues
}

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
