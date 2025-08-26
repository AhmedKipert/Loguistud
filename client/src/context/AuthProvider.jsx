import { me } from "../services/authService";
import AuthContext from "./AuthContext";
import { useState, useEffect } from "react";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const lien = import.meta.env.VITE_API_URL;

    // Initialisation du user
    useEffect(() => {
        const getUser = async () => {
            const res = await me();
            if (res.success) {
                setUser(res.user);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        getUser();
    }, []);

    return <AuthContext.Provider value={{ user, setUser, loading, setLoading, lien }}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;