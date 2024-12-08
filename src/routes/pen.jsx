import { useEffect } from "react";
import "../style.css"
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"; 

export default function Pen(){
    const pen = useLoaderData();

    useEffect(() => {
        document.title = `Pen Detail: ${pen.name}`;  
    }, []);
    
    return <div className="body">
        <Link to={`/`}>Back</Link> 
        <div className="penIndividual">
            <img className="penImg" src={process.env.PUBLIC_URL + '/images/' + pen.img_name}></img>
            <div className="penIndividualDesc">
                <h1>{pen.name}</h1>
                {pen.retail_price_USA && <h2>{pen.retail_price_USA}</h2>}
                
                <h2>{pen.brand.name}</h2>
                <div>
                    <p>{pen.category.name}</p>
                    <p>{pen.color}</p>
                    <p>{pen.tip.name}</p>
                </div>

                <Link to={`/editpen/${pen.id}`}>Edit</Link> 
                <button onClick={()=>{
                    fetch(`/pens/${pen.id}?_expand=brand&_expand=category&_expand=tip`, {
                        method: "DELETE"
                      }).then((response)=>{
                        toast.success("Saved!");
                      });
                }}>Delete</button>
            </div>
        </div>   

        <ToastContainer />

    </div>
}