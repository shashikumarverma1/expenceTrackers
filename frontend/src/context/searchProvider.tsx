import React, { createContext, useState } from "react";

export const SearchTextInFo = createContext(null);
const SearchProvider = ({ children }: unknown) => {
  const [SearchText, setSearchText] = useState(null);
 
//   console.log(children)

  return (
    <SearchTextInFo.Provider
      value={{ SearchText, setSearchText }}
    >
      {children}
    </SearchTextInFo.Provider>
  );
};
export default SearchProvider;
