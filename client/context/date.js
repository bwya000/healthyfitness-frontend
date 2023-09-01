import { createContext, useContext, useState } from "react"

const DateContext = createContext(null)

export default function DateProvider({ children }) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startDateOfLastWeek, setStartDateOfLastWeek] = useState("")
  const [endDateOfLastWeek, setEndDateOfLastWeek] = useState("")
  const [clickDate, setClickDate] = useState("")

  const dateContextValue = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startDateOfLastWeek,
    setStartDateOfLastWeek,
    endDateOfLastWeek,
    setEndDateOfLastWeek,
    clickDate,
    setClickDate
  }

  return (
    <DateContext.Provider value={dateContextValue}>
      {children}
    </DateContext.Provider>
  )
}

export const useDateContext = () => useContext(DateContext)
