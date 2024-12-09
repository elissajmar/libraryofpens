import { useLoaderData } from "react-router-dom";
import "../style.css"
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favorites(){
    const pens = useLoaderData();
    console.log(pens);

    useEffect(() => {
        document.title = "Favorites";  
    }, []);

    return (
        <div className="body">
            <div className="pens">
                {pens.map((pen) => {
                    {/* the to='' field has to match the url defined in index.js */}
                    return <Link to={`/pens/${pen.pen.id}`} key={pen.pen.id}> 
                        <img className="penImg" src={process.env.PUBLIC_URL + '/images/' + pen.pen.img_name}></img>
                    </Link>;
                })}
            </div>
        </div>
    )
}