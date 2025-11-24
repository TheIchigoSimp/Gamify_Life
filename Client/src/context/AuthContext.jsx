import { createContext, useState, useEffect, use } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userDetails = localStorage.getItem("user");
        if(token) {
            setUser({
                token,
                info: userDetails ? JSON.parse(userDetails) : null
            });
        }
        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}