import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const ProtectedRoute = ({ component: Component, ...props }) => {
    if (props.isLoadIn) {
        return <Preloader />
    }
    return (
        props.isLogin ? <Component {...props} /> : <Navigate to="/" />
    );
};

export default ProtectedRoute; 