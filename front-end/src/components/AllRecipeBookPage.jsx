import axios from "axios"
import { api } from "../utilities"
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

// import background from '../images/book.jpg'

export default function AllRecipeBookPage() {
    
    const [recipe_book, setRecipeBook] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        async function getRecipeBookData() {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const headers = { Authorization: `Token ${token}` };
                    const response = await axios.get("http://127.0.0.1:8000/api/recipe_book/", { headers });
                    console.log("API Response:", response);
                    setRecipeBook(response.data);
                } else {
                    console.log("No auth token found in local storage.");
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        getRecipeBookData();
    }, []);

    const navigateToRecipe = (id, title) => {
        navigate(`/recipe/${id}`, {state: {title:title}});
    }


    return (
        <div className = "image"
        style = {{
            height: "100vh",
            width: "100vw",
            // backgroundImage:`url(${background})`,
            // backgroundSize: "cover",
            // backgroundAttachment: "fixed"
        }}>
            <h1 className="flex justify-center text-6xl pt-40 font-semibold">Recipe Books</h1>
            {recipe_book.map((book) => (
                <div className="flex justify-center mt-20 mb-2 text-4xl font-medium text-grey-300" key={book.id}>
                    <button type='button' onClick= {() => navigateToRecipe(book.id, book.title)}>{book.title}</button>
                </div>
            ))}
        </div>
    )
}