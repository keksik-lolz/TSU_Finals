import React, {useCallback, useState, useContext} from 'react';
import { withRouter, Redirect } from "react-router";
import app from "../base";
import { AuthContext } from "../Auth";


const RegisterPage = ({ history }) => {

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
    }


    const handleSubmit = useCallback(async e => {
        e.preventDefault()
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(values.email, values.password);
        } catch(err) {
            setError(err)
        }
    }, [values])

    const { currentUser } = useContext(AuthContext)

    if(currentUser){
        return <Redirect to="/" />
    }

    return (
        <>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">New User Sign Up</h1>
                    <p className="col-md-8 fs-4">Please, sign up a new user or if you have one, follow this <a href="/login">link</a></p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <p className="text-danger">{error?.message}</p>
                    <form onSubmit={handleSubmit}>
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
                         <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default withRouter(RegisterPage);