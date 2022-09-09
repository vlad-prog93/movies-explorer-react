import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        props.isLogin ? <Component {...props} /> : <Navigate to="./signin" />
    );
};

export default ProtectedRoute; 