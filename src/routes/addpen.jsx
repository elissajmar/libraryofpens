import { useState, useEffect } from "react"; 
import "../style.css";
import { Link, useLoaderData } from "react-router-dom";
import TextInput from "../components/TextInput";

import {toast, ToastContainer} from "react-toastify"; 


export default function AddPen(){
    // Set document title
    useEffect(() => {
        document.title = "Add a Pen";  
    }, []);

    // To manage form inputs 
    const [name, setName] = useState("");
    const [set, setSet] = useState("");
    const [brand, setBrand] = useState("");
    const [tip, setTip] = useState("");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState(""); 
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState("");

    const { categories, brands, tips, sets } = useLoaderData();

    // For validation
    const [errors, setErrors] = useState({
        name: "",
        price: "",
        color: "",
        url: "",
        category: "",
        brand: "",
        set: "",
        tip: ""
    });
    
    const [isValid, setIsValid] = useState(false);

    // validation function
    const validateForm = () => {
        const newErrors = {};
        
        // Make sure name is not empty
        if (!name.trim()) {
            newErrors.name = "Name is required";
        }
        
        // Make sure price is not empty
        if (!price) {
            newErrors.price = "Price is required";
        }

        // Make sure price is not empty
        if (!color) {
            newErrors.color = "Color is required";
        }
        
        // Make sure url is appropriate
        if (!url.trim()) {
            newErrors.url = "URL is required";
        } else if (!url.startsWith("http")) {
            newErrors.url = "URL must start with http";
        }
        
        // Make sure something is selected
        if (!category || category === "--Select a category--") {
            newErrors.category = "Please select a category";
        }
        if (!brand || brand === "--Select a brand--") {
            newErrors.brand = "Please select a brand";
        }
        if (!set || set === "--Select a pen set--") {
            newErrors.set = "Please select a set";
        }
        
        // Make sure a tip is selected
        if (!tip) {
            newErrors.tip = "Please select a tip";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return <div className="body">
        <Link to={`/`}>Back</Link> 

        <h1>Add a new pen</h1>
        
        <form onSubmit={(event) => {
            event.preventDefault(); //prevent form submissions
            
            if (validateForm()){
                fetch(`/pens`, {
                    method: "POST",
                    body: JSON.stringify({
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
            } else {
                toast.error("Form has not been filled out correctly.");
            }
        }}> 
            
            <TextInput 
                id="name" 
                label="Name" 
                value={name}
                onChange={(updatedName) => {
                    setName(updatedName);
                    setErrors({...errors, name: ""});
                }}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}

            <TextInput 
                id="price" 
                label="Price" 
                value={price}
                onChange={(updatedPrice) => {
                    setPrice(updatedPrice);
                    setErrors({...errors, price: ""});
                }}
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
            
            <TextInput 
                id="color" 
                label="Color" 
                value={color}
                onChange={(updatedColor) => {
                    setColor(updatedColor);
                    setErrors({...errors, color: ""});
                }}
            />
            {errors.color && <div className="error-message">{errors.color}</div>}
            
            <label htmlFor="url">
                    Url
                </label>
            <div>
                <textarea 
                    id="url" 
                    rows="3" 
                    value={url} 
                    onChange={(event) => {
                        const value=event.target.value; 
                        setUrl(value);
                    }}
                />
                {errors.url && <div className="error-message">{errors.url}</div>}
            </div>

            <select 
                value={category} 
                onChange={(event)=>{ 
                    setCategory(event.target.value); 
                    setErrors({...errors, category: ""});
                }}>
                <option>--Select a category--</option>
                {categories.map((category) => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </select>
            {errors.category && <div className="error-message">{errors.category}</div>}

            <select 
                value={brand} 
                onChange={(event)=>{ 
                    setBrand(event.target.value); 
                    setErrors({...errors, brand: ""});
                }}>
                <option>--Select a brand--</option>
                {brands.map((brand) => {
                    return <option key={brand.id} value={brand.id}>{brand.name}</option>
                })}
            </select>
            {errors.brand && <div className="error-message">{errors.brand}</div>}

            <select 
                value={set} 
                onChange={(event)=>{
                    setSet(event.target.value); 
                    setErrors({...errors, set: ""});
                }}>
                <option>--Select a pen set--</option>
                {sets.map((set) => {
                    return <option key={set.id} value={set.id}>{set.name}</option>
                })}
            </select>
            {errors.set && <div className="error-message">{errors.set}</div>}


            <p>Select a tip</p>
            <div>
                {tips.map((tip)=>{
                    return <div>
                        <input
                            type="radio"
                            name="tip-select"
                            id={tip.id}
                            key={tip.id}
                            onChange={() =>{
                                setTip(tip.id);
                                setErrors({...errors, tip: ""});
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
            {errors.tip && <div className="error-message">{errors.tip}</div>}


            <button type="submit">
                Submit
            </button>
            
        </form>

        <ToastContainer />
        
    </div>
}