import React, { createContext, useContext, useState } from "react";

const UserNameContext = createContext();

export const useUserName = () => {
  return useContext(UserNameContext);
};

export function UserNameProvider({ children }) {
  const [userName, setUserName] = useState("");

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
}
