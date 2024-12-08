import { Link } from "react-router-dom";
import "../style.css"

export default function Navigation() {
    return (
      <div className="navbar">
        <Link to="/" className="navtext">
          HOME
        </Link>
        <Link to="/favorites" className="navtext">
          FAVORITES
        </Link>
        <Link to="/addpen" className="navtext">
          ADD PEN
        </Link>
      </div>
    );
  }