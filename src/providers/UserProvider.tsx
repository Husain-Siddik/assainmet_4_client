"use client";

import { createContext, useContext, useState, ReactNode } from "react";

//  User type definition
export interface User {
    id: string;
    email: string;
    role: string;
    name?: string;
}

//  Context 
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    refreshSession: (user: User | null) => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
    children: ReactNode;
    initialUser: User | null;
}

export function UserProvider({ children, initialUser }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser);

    // Refresh 
    const refreshSession = (newUser: User | null) => {
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, setUser, refreshSession }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook 
export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used inside UserProvider");
    return context;
}