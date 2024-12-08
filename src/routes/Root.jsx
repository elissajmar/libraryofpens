import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation.jsx";
import "../style.css"

export default function Root() {
  return (
    <div className="body">
      <Navigation />
      <Outlet />
    </div>
  );
}
