import React, { createContext, useEffect, useState } from "react";
import { getMe } from "../Api/user.api";

type User = {
  _id: string;
  userName: string;
  email: string;
};

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
};

export const authContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await getMe();
        console.log(response, "hi");
        setUser(response.data);
      } catch (error) {
        console.log("get me error ", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, loading }}>
      {children}
    </authContext.Provider>
  );
};
