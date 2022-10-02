import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        props.isLogin && <Component {...props} />
    );
};

export default ProtectedRoute; 