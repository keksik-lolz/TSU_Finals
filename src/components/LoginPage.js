import React, {useContext, useState, useCallback} from 'react';
import { withRouter, Redirect } from "react-router";
import app from "../base"
import { AuthContext } from "../Auth";


const LoginPage = ({ history }) => {

    let initialFormValues = {
        email: "",
        password: "",
    }
    
    let [values, setValues] = useState(initialFormValues);
    let [error, setError] = useState(null);
    
    const handleInputChange = e => {
        let {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
        console.log(values)
    }

    const handleSubmit = useCallback(async e => {
        e.preventDefault()
        console.log(values)
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(values.email, values.password);
            history.push("/");
        } catch(err) {
            setError(err)
        }
    }, [history, values])

    const { currentUser } = useContext(AuthContext)

    if(currentUser){
        return <Redirect to="/" />
    }
    
    return (
        <>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">User Log In</h1>
                    <p className="col-md-8 fs-4">Please, Log In with exsiting user or if you don't have one, follow this <a href="/signup">link</a></p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <p className="text-danger">{error?.message}</p>
                        <div className="input-group mb-3">
                            <input type="text" placeholder="Email" className="form-control" name="email"
                                value={values.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" placeholder="Passsword" className="form-control" name="password" 
                                value={values.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                         <button type="submit" className="btn btn-primary">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default withRouter(LoginPage);