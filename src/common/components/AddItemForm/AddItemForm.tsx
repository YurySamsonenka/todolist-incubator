import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"

type Props = {
  addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: Props) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeItemHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const addItemOnKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        label="Enter a title"
        variant={"outlined"}
        className={error ? "error" : ""}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
      />
      <IconButton onClick={addItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
