import React, { createContext, useState } from "react";

export const UserInfo = createContext(null);
const UserProvider = ({ children }: unknown) => {
  const [token, setToken] = useState( localStorage.getItem("token") || null);

  return (
    <UserInfo.Provider
      value={{ token, setToken }}
    >
      {children}
    </UserInfo.Provider>
  );
};
export default UserProvider;
