import React, { useContext } from "react";
import {Route, Redirect} from "react-router-dom";
import { AuthContext } from "./Auth";


const PrivateRoute = ({ componet: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    if(currentUser){
        return <Route {...rest} render={routeProps => <RouteComponent {...routeProps} />} />
    } else {
        if(window.location.pathname !== '/signup'){
            console.log(window.location.pathnmae)
            return <Redirect to="/login" />
        } else {
            return <Redirect to="/signup" />
        }
    }
}

export default PrivateRoute;