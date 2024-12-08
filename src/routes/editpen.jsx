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

    return <div className="body">
        <Link to={`/pens/${pen.id}`}>Back</Link> 

        <h1>Editing {pen.name} </h1>
        
        <form onSubmit={(event) => {
            event.preventDefault(); //prevent form submissions
            
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
        }}> 
            
            <TextInput 
                id="name" 
                label="Name" 
                value={name}
                onChange={(updatedName) => {
                    setName(updatedName);
                }}
            />

            <TextInput 
                id="color" 
                label="Color" 
                value={color}
                onChange={(updatedColor) => {
                    setColor(updatedColor);
                }}
            />

            <button type="submit">
                Submit
            </button>
            
        </form>

        <ToastContainer />
        
    </div>
}