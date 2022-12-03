import { createContext } from "react";

export const userContext = createContext({});

export const UserContextProvider = ({ Children }) => {
  const validtion = async (schema, data) => {
    const checkErrors = await schema
      .validate(data, { abortEarly: false })
      .catch((err) => err);
    if (checkErrors.inner !== undefined) {
      const errorMsg = [...checkErrors.inner].reduce((a, b) => {
        a[b.path] = b.message;
        return a;
      }, {});
      return errorMsg;
    }
  };

  return (
    <userContext.Provider value={{ validtion }}>
      {Children}
    </userContext.Provider>
  );
};
