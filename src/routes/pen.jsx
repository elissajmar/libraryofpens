import { useState, useEffect } from "react";
import "../style.css"
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"; 

// icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart } from "@fortawesome/free-solid-svg-icons";
import PenPage from "../components/penPage";

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
        <PenPage
            img={pen.img_name}
            name={pen.name}
            penId={pen.id}
            retail_price_USA={pen.retail_price_USA}
            brand={pen.brand.name}
            category={pen.category.name}
            color={pen.color}
            tip={pen.tip.name}
            favorite={favorite}
            setFavorite={(favorite) => {
                setFavorite(favorite);
            }}
            renderHeart={(favorite) => {
                return <FontAwesomeIcon 
                    icon={faHeart} 
                    color={favorite ? "red" : "#E2E1DD"} 
                    size="2x" 
                />
            }}
        ></PenPage>

        <ToastContainer />

    </div>
}