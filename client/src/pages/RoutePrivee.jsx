import AuthContext from "../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "./autres/Loading";

const RoutePrivee = () => {
    const {user, loading, setLoading} = useContext(AuthContext);

    if(loading) return <Loading/>

    if(!user) return <Navigate to={'/connexion'} replace/>

    setLoading(false);

    return <Outlet/>;
}

export default RoutePrivee;