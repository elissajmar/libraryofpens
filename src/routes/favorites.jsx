import { useLoaderData } from "react-router-dom";
import "../style.css"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PenCard from "../components/penCard";

export default function Favorites(){
    const pens = useLoaderData();
    console.log(pens);

    useEffect(() => {
        document.title = "Favorites";  
    }, []);

    return (
        <div className="body">
            <div className="bgText">
                Your Favorites
            </div>
            <div className="pens">
                {pens.map((pen) => {
                    {/* the to='' field has to match the url defined in index.js */}
                    return <PenCard
                        penId = {pen.pen.id}
                        penImg = {pen.pen.img_name}
                        src = {process.env.PUBLIC_URL + '/images/' + pen.pen.img_name}
                    ></PenCard>
                })}
            </div>
        </div>
    )
}