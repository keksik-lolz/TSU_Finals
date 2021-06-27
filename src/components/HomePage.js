import React, {useContext, useState, useEffect} from "react";
import app from "../base";
import { AuthContext } from "../Auth";


const HomePage = () => {



    let { currentUser } = useContext(AuthContext);
    
    
    let initialFormValues = {
        title: "",
        note: "",
    }

    let [values, setValues] = useState(initialFormValues);
    let [data, setData] = useState([]);

    const handleInputChange = e => {
        let {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleLogOut = () => {
        app.auth().signOut()
    }


    const handleAddOrEdit = (e) => {
        e.preventDefault();
        let obj = { title: values.title, note: values.note }
        if(values.change){
            app.database().ref().child(`users/${currentUser.uid}/${values.change}`).set(obj)
            setValues(initialFormValues)
        } else {
            app.database().ref().child('users/').child(`${currentUser.uid}`).push(obj, res => console.log(res))
            setValues(initialFormValues)
        }
    }


    let resp;

    useEffect(async () => {
        await app.database().ref().child(`users/${currentUser.uid}`).on('value', res => {
            if(res.val() !== null){
                setData({
                    ...res.val()
                })
            }
        }) 
    }, [])


    const handleDelete = id => {
        app.database().ref().child(`users/${currentUser.uid}/${id}`).remove()
    }

    const handleUpdate = (id, title, note) => {
        setValues({title, note, change: id})
    }


    
    

    return (
        <div className="container">
            <div className="row">
                <span className="text-center">You're logged in with <strong>{currentUser.email}</strong><button className="btn btn-primary m-2" onClick={handleLogOut}>Log Out</button></span>
                <form onSubmit={handleAddOrEdit}>
                <div className="input-group mb-3">
                    <input type="text" placeholder="Title" className="form-control" name="title"
                        value={values.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <textarea className="form-control" placeholder="Note" name="note" 
                        style={{minheight: "50px", maxHeight: "150px"}}
                        value={values.note}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{values.change ? 'Update Note':'Create Note'}</button>
                </form>
            </div>
            <div className="row">
                <h1 className="display-8 fw-bold text-center pt-2">Your Notes</h1>
                <div className="accordion" id="accordion">
                    {Object.keys(data).map((id,i) => {
                        return (
                            <div className="accordion-item" key={id}>
                                <h2 className="accordion-header" id={`${id}-${i}`}>
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}-col`} aria-expanded="true" aria-controls={id}>
                                        {data[id].title}
                                </button>
                                </h2>
                                <div id={`${id}-col`} className="accordion-collapse collapse" aria-labelledby={id}>
                                    <div className="accordion-body">
                                        {data[id].note}
                                    </div>
                                    <div>
                                    <button className="btn btn-success m-2" onClick={() => handleUpdate(id, data[id].title, data[id].note)}>Update</button><button className="btn btn-danger m-2" onClick={()=> handleDelete(id)}>Delete</button>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default HomePage;