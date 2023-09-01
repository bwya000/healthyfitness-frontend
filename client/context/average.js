import { createContext, useContext, useState } from "react"

const BodyDataContext = createContext(null)

export default function BodyDataProvider({ children }) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startDateOfLastWeek, setStartDateOfLastWeek] = useState("")
  const [endDateOfLastWeek, setEndDateOfLastWeek] = useState("")


  const dateContextValue = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startDateOfLastWeek,
    setStartDateOfLastWeek,
    endDateOfLastWeek,
    setEndDateOfLastWeek,

  }

  return (
    <DateContext.Provider value={dateContextValue}>
      {children}
    </DateContext.Provider>
  )
}

export const useDateContext = () => useContext(DateContext)
