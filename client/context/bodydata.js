import { createContext, useContext, useState } from "react"

const BodyDataContext = createContext(null)

export default function BodyDataProvider({ children }) {
  const [dataDetail, setdataDetail] = useState([])

  return (
    <BodyDataContext.Provider value={{dataDetail, setdataDetail}}>
      {children}
    </BodyDataContext.Provider>
  )
}

export const useBodyDataContext = () => useContext(BodyDataContext)

