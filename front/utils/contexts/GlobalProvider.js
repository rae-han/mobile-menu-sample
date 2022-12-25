import React, { createContext, useState } from 'react'

export const GlobalContext = createContext({
  isSideMenu: false,
  setIsSideMenu: (value) => {},
  test: '',
})

const GlobalContextProvider = ({children}) => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const setIsSideMenuHandler = (value) => setIsSideMenu(value);

  return (
    <GlobalContext.Provider value={{ isSideMenu, setIsSideMenu, test: 'test' }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;