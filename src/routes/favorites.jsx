import "../style.css"
import { useEffect } from "react";


export default function Favorites(){
    useEffect(() => {
        document.title = "Favorites";  
    }, []);

    return (
        <div className="body">
            FAVORITES
        </div>
    )
}