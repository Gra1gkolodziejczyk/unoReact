import { Dispatch, SetStateAction, createContext, useState } from "react";

import { User } from "../../types/user";

type UserProviderType = {
  children: JSX.Element;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const defaultUserContext = {
  user: {
    id: "",
    username: "",
    email: "",
  },
  setUser: () => {},
} as UserContextInterface;

export const UserContext = createContext(defaultUserContext);

export default function UserProvider({ children }: UserProviderType) {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
