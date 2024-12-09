import { Link } from "react-router-dom";

/* Expected Props:
    Pen Id 
    Pen Img Name
    Src
*/ 

export default function PenCard(props){
    return(
        <Link 
            className="pen"
            to={`/pens/${props.penId}`} 
            key={props.penId}
        > 
            <img 
                className="penImg" 
                src={props.src}>
            </img>
        </Link>
    )
}