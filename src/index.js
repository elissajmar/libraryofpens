import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "react-toastify/ReactToastify.css";

import Home from "./routes/home";
import Root from "./routes/Root";
import Favorites from "./routes/favorites";
import Pen from "./routes/pen";
import EditPen from "./routes/editpen";
import AddPen from "./routes/addpen";


function fetchCategories(){
  return fetch("/categories").then(
      (response)=>{
      return response.json();
  })
  .then((json)=>{
      const categories = json;
      return(categories);
  })
}

function fetchBrands(){
  return fetch("/brands")
  .then(
      (response)=>{
      return response.json();
  })
  .then((json)=>{
      const brands = json;
      return(brands);
  })
}

function fetchTips(){
  return fetch("/tips").then(
      (response)=>{
      return response.json();
  })
  .then((json)=>{
      const tips = json;
      console.log(tips);
      return(tips);
  })
}

function fetchSets(){
  return fetch("/sets").then(
      (response)=>{
      return response.json();
  })
  .then((json)=>{
      const sets = json;
      return(sets);
  })
}

const router = createBrowserRouter([
  {
    element: <Root />, // doesn't need to be called Root
    children: [
      {
        path: "/",
        element: <Home />,
        loader() {
          return fetch(
            "/pens"
          ).then((response) => {
            return response.json();
          });
        },
      }, 
      {
        path: "/favorites",
        element: <Favorites />
      },
      {
        path:"/pens/:penId", // :postd = dynamic segment
        element: <Pen />,
        loader({params}){ 
          return fetch(
            `/pens/${params.penId}?_expand=brand&_expand=category&_expand=tip`
          )
          .then((response)=>{
            return response.json();
          }); 
        }
      },
      {
        path:"/editpen/:penId", // :postd = dynamic segment
        element: <EditPen />,
        loader({params}){ 
          return fetch(
            `/pens/${params.penId}?_expand=brand&_expand=category&_expand=tip`
          )
          .then((response)=>{
            return response.json();
          }); 
        }
      },
      {
        path: "/addpen",
        element: <AddPen/>,
        loader(){
          return Promise.all([
            fetchCategories(),
            fetchBrands(),
            fetchTips(),
            fetchSets()
          ]).then(([categories, brands, tips, sets]) => {
            return {
              categories,
              brands,
              tips,
              sets
            };
          });
        }
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();