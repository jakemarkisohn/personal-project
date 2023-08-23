import axios from "axios"
import { api } from "../utilities"
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import background from '../images/book.jpg'

export default function AllRecipeBookPage() {
    
    const [recipe_book, setRecipeBook] = useState([]);
    const navigate = useNavigate()
    const [newRecipeBook, setNewRecipeBook] = useState({
        title: ''
    });


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


    const handleSubmit = async (e) => {  // send new recipe book to database
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            if (token) {
                axios.defaults.headers.common["Authorization"] = `Token ${token}`;
                const response = await api.post("recipe_book/create/", newRecipeBook);
                navigate("/recipe_books/")
            }
            alert("Recipe Book Created!")
            window.location.reload();

        } catch (error) {
            console.error("New Recipe Book Error: ", error);
            alert("Something went wrong")
        }
      };


    const navigateToRecipe = (id, title) => {
        navigate(`/recipe/${id}`, {state: {title:title}});
    }

    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewRecipeBook((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
       
        <div className = "image"
        style = {{
            height: "100vh",
            width: "100vw",
            backgroundImage:`url(${background})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed"
        }}>
        <div className="pt-10 text-2xl"> 
               <h2 className="flex justify-center pb-5"> New Recipe Book </h2>
               <div className="flex justify-center">
                    <input type="text"
                    name="title"
                    className="w-96 h-8 border border-solid border-blue-800 p-2 rounded-md" 
                    onChange={handleInputChange}/> 
                    <button type="button" className="border border-solid border-blue-600 px-4 h-8 rounded-md" onClick={handleSubmit}> Create </button>
                </div>
            </div>
        
            <h1 className="flex justify-center text-6xl pt-10 font-semibold">Recipe Books</h1>
            {recipe_book.map((book) => (
                <div className="flex justify-center mt-10 mb-10 text-4xl font-medium text-grey-300 p" key={book.id}>
                    <button type='button' onClick= {() => navigateToRecipe(book.id, book.title)}>{book.title}</button>
                    {/* <div>
                        <button type="button" onClick={() => deleteBook(book.id)}  className="border border-solid border-blue-600 px-4 h-8 rounded-md text-xl"> Delete </button>
                    </div> */}
                </div>
            ))}
        </div>
    )
}

// onChange={handleInputChange}