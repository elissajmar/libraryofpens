import { useState, useEffect } from "react"; 
import "../style.css";
import { Link, useLoaderData } from "react-router-dom";
import TextInput from "../components/TextInput";

import {toast, ToastContainer} from "react-toastify"; 

export default function EditPen(){

    const pen = useLoaderData();

    useEffect(() => {
        document.title = `Edit Pen: ${pen.name}`;  
    }, []);

    const [name, setName] = useState(pen.name); 
    const [color, setColor] = useState(pen.color); 
    const [isConfirmed, setIsConfirmed] = useState(false);


    // For validation
    const [errors, setErrors] = useState({
        name: "",
        color: "",
        check: ""
    });

    const validateForm = () => {
        const newErrors = {};
        
        // Make sure name is not empty
        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        // Make sure price is not empty
        if (!color) {
            newErrors.color = "Color is required";
        }

        // Make sure to confirm
        if (!isConfirmed) {
            newErrors.check = "Please confirm";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return <div className="body">
        <Link to={`/pens/${pen.id}`}>Back</Link> 

        <h1>Editing {pen.name} </h1>
        
        <form onSubmit={(event) => {
            event.preventDefault(); //prevent form submissions
            if(validateForm()){
                fetch(`/pens/${pen.id}?_expand=brand&_expand=category&_expand=tip`, {
                    method: "PATCH",
                    body: JSON.stringify({
                      name: name,
                      color: color
                    }),
                    headers: {
                      "Content-type": "application/json",
                    },
                  }).then((response)=>{
                    return response.json();
                  }).then((json) => {
                    toast.success("Saved!");
                  });
            } else {
                toast.error("Form has not been filled out correctly.");
            }
        }}> 
            
            <TextInput 
                id="name" 
                label="Name" 
                value={name}
                onChange={(updatedName) => {
                    setName(updatedName);
                    setErrors({...errors, name: ""});
                }}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}

            <TextInput 
                id="color" 
                label="Color" 
                value={color}
                onChange={(updatedColor) => {
                    setColor(updatedColor);
                    setErrors({...errors, color: ""});
                }}
            />
            {errors.color && <div className="error-message">{errors.color}</div>}

            <div>
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="confirm" 
                    checked={isConfirmed}
                    onChange={(event)=> {
                        setIsConfirmed(event.target.checked);
                    }}
                />
                <label className="form-check-label" htmlFor="newsletter">
                    Confirm changes?
                </label>
                {errors.check && <div className="error-message">{errors.check}</div>}
            </div>
            


            <button type="submit">
                Submit
            </button>
            
        </form>

        <ToastContainer />
        
    </div>
}