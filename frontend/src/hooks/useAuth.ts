import { useContext } from "react";
import { authContext } from "../Context/authContext";

export const useAuth = () => {
  const userContext = useContext(authContext);

  if (!userContext) {
    throw new Error("useAUth context isseue");
  }

  return userContext;
};
