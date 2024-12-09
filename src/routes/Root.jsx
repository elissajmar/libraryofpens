import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation.jsx";
import "../style.css"

export default function Root() {
  return (
    <div className="body">
      <img className="overlay" src={process.env.PUBLIC_URL + '/images/Texture Overlay.jpg'}></img>
      <Navigation />
      <Outlet />
    </div>
  );
}
