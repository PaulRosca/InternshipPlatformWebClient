import React, { createContext, useState } from 'react';

type UserProviderProps = {
    children: React.ReactNode
}

export type ContactMethod = "email" | "phone" | "any";
export type UserType = "company" | "applicant";
export interface IUser {
    email: string,
    password: string,
    avatar?: string,
    type: UserType
};

export interface IApplicant extends IUser {
    firstName: string,
    lastName: string,
    phone?: string,
    contactMethod: ContactMethod,
    cv?: string
};

export interface ICompany extends IUser {
    name: string,
    numberOfEmployees?: string
};

interface UserContextProps {
  user: IApplicant | ICompany | null,
  setUser: (user: IApplicant | ICompany | null) => void
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {}
});

export const UserProvider: React.FC<UserProviderProps>= ({ children }) => {
  const [user, setUser] = useState<IApplicant| ICompany | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
