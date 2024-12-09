import { useState, useEffect } from "react";
import "../style.css"
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"; 

// icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Pen(){
    const {pen, favorites} = useLoaderData();
    console.log(pen)
    console.log(favorites)
   
    const [favorite, setFavorite] = useState(
        favorites.map(fav => fav.penId).includes(pen.id)
    );
    
    useEffect(() => {
        document.title = `Pen Detail: ${pen.name}`;  
    }, []);
    
    return <div className="body">
        <Link to={`/`}>Back</Link> 
        <div className="penIndividual">
            <img className="penImg" src={process.env.PUBLIC_URL + '/images/' + pen.img_name}></img>
            <div className="penIndividualDesc">
                <div className="descTop">
                    <button 
                        className="favorite"
                        type="button"
                        onClick={() => {
                            const updatedFavorite = !favorite; 

                            setFavorite(updatedFavorite);

                            // if adding a favorite
                            if(updatedFavorite){ 
                                fetch(`/favorites`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        penId: pen.id
                                    }),
                                    headers: {
                                        "Content-type": "application/json",
                                    },
                                }).then((response)=>{
                                    return response.json();
                                }).then((json) => {
                                    toast.success("Added to favorites!");
                                }).catch((e) => {
                                    setFavorite(!updatedFavorite);
                                    toast.error("Oops, something went wrong.");
                                });
                            } 
                            // if removing a favorite
                            else {
                                fetch(`/favorites?penId=${pen.id}`)
                                .then(response => response.json())
                                .then(favorites => {
                                    if (favorites.length > 0) {
                                        return fetch(`/favorites/${favorites[0].id}`, {
                                            method: "DELETE"
                                        });
                                    }
                                })
                                .then((response) => {
                                    toast.success("Removed from favorites!");
                                })
                                .catch((e) => {
                                    setFavorite(!updatedFavorite);
                                    toast.error("Oops, something went wrong.");
                                });
                            }
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faHeart} 
                            color={favorite ? "red" : "#E2E1DD"} 
                            size="2x" 
                        />
                    </button>

                    <h1>{pen.name}</h1>
                    {pen.retail_price_USA && <h2>{pen.retail_price_USA}</h2>}
                    
                    <h2>{pen.brand.name}</h2>
                    <div className="hflex">
                        <div className="tag"><p>{pen.category.name}</p></div>
                        <div className="tag"><p>{pen.color}</p></div>
                        <div className="tag"><p>{pen.tip.name}</p></div>
                    </div>
                </div>
                
                <div className="hflex">
                    <Link className="actionButton" to={`/editpen/${pen.id}`}>Edit</Link> 
                    <button className="actionButton" onClick={()=>{
                        fetch(`/pens/${pen.id}?_expand=brand&_expand=category&_expand=tip`, {
                            method: "DELETE"
                        }).then((response)=>{
                            toast.success("Saved!");
                        });
                    }}>Delete</button>
                </div>
                
            </div>
        </div>   

        <ToastContainer />

    </div>
}