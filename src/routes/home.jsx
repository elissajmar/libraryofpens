import { useEffect } from "react";
import "../style.css"
import { useLoaderData } from "react-router-dom";

import { Link } from "react-router-dom";
import PenCard from "../components/penCard";


export default function Home(){
    useEffect(() => {
        document.title = "Home Page";  
    }, []);
    
    const pens = useLoaderData();

    return (
        <div className="body">
            <div className="bgText">
                Your Collection
            </div>
            <div className="pens">
                {pens.map((pen) => {
                    return <PenCard
                        penId = {pen.id}
                        penImg = {pen.img_name}
                        src = {process.env.PUBLIC_URL + '/images/' + pen.img_name}
                    ></PenCard>
                })}
            </div>
        </div>
    )
}