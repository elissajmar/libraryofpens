import { useState, useEffect } from "react"; 
import "../style.css";
import { Link, useLoaderData } from "react-router-dom";
import TextInput from "../components/TextInput";

import {toast, ToastContainer} from "react-toastify"; 


export default function AddPen(){
    useEffect(() => {
        document.title = "Add a Pen";  
    }, []);

    const [name, setName] = useState("");
    const [set, setSet] = useState("");
    const [brand, setBrand] = useState("");
    const [tip, setTip] = useState("");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState(""); 
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState("");

    const { categories, brands, tips, sets } = useLoaderData();

    return <div className="body">
        <Link to={`/`}>Back</Link> 

        <h1>Add a new pen</h1>
        
        <form onSubmit={(event) => {
            event.preventDefault(); //prevent form submissions
            
            fetch(`/pens`, {
                method: "POST",
                body: JSON.stringify({
                //   id: something here,
                  name: name,
                  setId: set, 
                  brandId: brand,
                  tipId: tip, 
                  categoryId: category,
                  color: color,
                  url: url, 
                  price: price,
                  img_name: "DefaultPen.jpg"
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }).then((response)=>{
                return response.json();
              }).then((json) => {
                toast.success("Added!");
              });
        }}> 
            
            <TextInput 
                id="name" 
                label="Name" 
                value={name}
                onChange={(updatedName) => {
                    setName(updatedName);
                }}
            />

            <TextInput 
                id="price" 
                label="Price" 
                value={price}
                onChange={(updatedPrice) => {
                    setPrice(updatedPrice);
                }}
            />

            <TextInput 
                id="color" 
                label="Color" 
                value={color}
                onChange={(updatedColor) => {
                    setColor(updatedColor);
                }}
            />

            <TextInput 
                id="url" 
                label="Url" 
                value={url}
                onChange={(updatedUrl) => {
                    setUrl(updatedUrl);
                }}
            />

            <select 
                value={category} 
                onChange={(event)=>{ 
                    setCategory(event.target.value); 
                }}>
                <option>--Select a category--</option>
                {categories.map((category) => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </select>

            <select 
                value={brand} 
                onChange={(event)=>{ 
                    setBrand(event.target.value); 
                }}>
                <option>--Select a brand--</option>
                {brands.map((brand) => {
                    return <option key={brand.id} value={brand.id}>{brand.name}</option>
                })}
            </select>

            <select 
                value={set} 
                onChange={(event)=>{
                    setSet(event.target.value); 
                }}>
                <option>--Select a pen set--</option>
                {sets.map((set) => {
                    return <option key={set.id} value={set.id}>{set.name}</option>
                })}
            </select>

            <p>Select a tip</p>
            <div>
                {tips.map((tip)=>{
                    return <div>
                        <input
                            type="radio"
                            name="tip-select"
                            id={tip.id}
                            onChange={() =>{
                                setTip(tip.id);
                            }}
                        />
                        <label
                            htmlFor={tip.name}
                        >
                            {tip.name}
                        </label>
                    </div>
                })} 
            </div>

            <button type="submit">
                Submit
            </button>
            
        </form>

        <ToastContainer />
        
    </div>
}