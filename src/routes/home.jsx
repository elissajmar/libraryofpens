import { useEffect } from "react";
import "../style.css"
import { useLoaderData } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Home(){
    useEffect(() => {
        document.title = "Home Page";  
    }, []);
    
    const pens = useLoaderData();

    return (
        <div className="body">
            <div className="pens">
                {pens.map((pen) => {
                    {/* the to='' field has to match the url defined in index.js */}
                    return <Link to={`/pens/${pen.id}`} key={pen.id}> 
                        <img className="penImg" src={process.env.PUBLIC_URL + '/images/' + pen.img_name}></img>
                    </Link>;
                })}
            </div>
        </div>
    )
}