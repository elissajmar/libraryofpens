import { useState, useEffect } from "react";
import "../style.css"
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"; 

// icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart } from "@fortawesome/free-solid-svg-icons";

/* Expected props
    img
    penId
    setFavorite
    retail_price_USA
    brand
    category
    tip
 */

export default function PenPage(props){
    const favorite = props.favorite;

    return(
        <div className="penIndividual">
            <img className="penImg" src={process.env.PUBLIC_URL + '/images/' + props.img}></img>
            <div className="penIndividualDesc">
                <div className="descTop">
                    <button 
                        className="favorite"
                        type="button"
                        onClick={() => {
                            const updatedFavorite = !favorite; 
                            
                            {props.setFavorite(updatedFavorite)};

                            // if adding a favorite
                            if(updatedFavorite){ 
                                fetch(`/favorites`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        penId: props.penId
                                    }),
                                    headers: {
                                        "Content-type": "application/json",
                                    },
                                }).then((response)=>{
                                    return response.json();
                                }).then((json) => {
                                    toast.success("Added to favorites!");
                                }).catch((e) => {
                                    {props.setFavorite(updatedFavorite)};
                                    toast.error("Oops, something went wrong.");
                                });
                            } 
                            // if removing a favorite
                            else {
                                fetch(`/favorites?penId=${props.penId}`)
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
                                    {props.setFavorite(updatedFavorite)};
                                    toast.error("Oops, something went wrong.");
                                });
                            }
                        }}
                    >
                        {props.renderHeart(favorite)}
                    </button>

                    <h1 data-testid="name">{props.name}</h1>
                    {props.retail_price_USA && <h2>{props.retail_price_USA}</h2>}
                    
                    <h2 data-testid="brand">{props.brand}</h2>
                    <div className="hflex">
                        <div className="tag"><p>{props.category}</p></div>
                        <div className="tag"><p>{props.color}</p></div>
                        <div className="tag"><p>{props.tip}</p></div>
                    </div>
                </div>
                
                <div className="hflex">
                    <Link className="actionButton" to={`/editpen/${props.penId}`}>Edit</Link> 
                    <button className="actionButton" onClick={()=>{
                        fetch(`/pens/${props.penId}?_expand=brand&_expand=category&_expand=tip`, {
                            method: "DELETE"
                        }).then((response)=>{
                            toast.success("Saved!");
                        });
                    }}>Delete</button>
                </div>
                
            </div>
        </div> 
    )
}   