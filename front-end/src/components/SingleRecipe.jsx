import axios from "axios"
import { api } from "../utilities"
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import background from '../images/blankpage.jpg'


export default function SingleRecipePage() {     
    const navigate = useNavigate()
    const { recipeBookId, recipeId } = useParams()
    const [recipe, setRecipe] = useState(null)

    // Use the recipe_book_id from recipe book page, and recipe_id from onclick to request data for that specific recipe
    useEffect(() => {
        async function getRecipeData() {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const headers = { Authorization: `Token ${token}`};
                    const response = await axios.get(`http://127.0.0.1:8000/api/recipe/${recipeBookId}/${recipeId}`, { headers });
                    console.log("API Response: ", response);
                    setRecipe(response.data)
                } else {
                    console.log("No auth token found in local storage.");
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        getRecipeData(); // get all recipe info here to turn into an object - that way you can pass the Django recipe data and the other api data through the same object model so that they are formated the same 
    }, [recipeBookId, recipeId]);


    const deleteRecipe = async (e) => { // delete a recipe book
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`;
                const response = await api.delete(`recipe/${recipeBookId}/${recipeId}`);
                console.log(response.data)
                navigate("/recipe_books/")
            }
            alert("Recipe Successfully Deleted!")
           
        }   catch (error) {
            console.error("Error Deleting RecipeBook: ", error);
            alert("Something went wrong")
        }
        
    }

    const navigateToRecipeList = () => {
        navigate(`/recipe/${recipeBookId}/`)
   }

    return (
        // <div className = "image"
        // style = {{
        //     height: "100vh",
        //     width: "100vw",
        //     backgroundImage:`url(${background})`,
        //     backgroundSize: "cover",
        //     backgroundAttachment: "fixed"
        // }}>
            <div className="bg-slate-400">
            {recipe && (
                <div>
            <h1 className="flex justify-center text-6xl pt-20 text font-semibold ">{recipe.title}</h1>
                <div className="flex justify-center mt-10 mb-2 text-4xl"> 
                    <dl className="list-disc font-medium text-white-500">
                        {/* <dt className="p-4">{recipe.title}</dt> */}
                        <dl>Ingredients:
                        <dl className="list-inside p-4">
                            {recipe.ingredients.split(',').map((ingredient, index) => (
                                <dd key={index}>- {ingredient.trim()}</dd>
                            ))}
                        </dl>
                        </dl>
                        <dl>Instructions:
                        <dl className="list-inside p-4">
                            {recipe.instructions.split('.').map((instruction, index) => (
                                <dd key={index}>{index + 1}. {instruction.trim()}</dd>
                            ))}
                        </dl>
                        </dl>
                        <dt className="p-2">Time: {recipe.time}</dt>
                        <dt className="p-2">Category: {recipe.category}</dt>
                    </dl>
                </div>
                </div>
            )}
                <div className="flex justify-center pt-8 space-x-8">
                    <button type="button" className="flex flex-center px-4 py-2 bg-green-800 text-white rounded hover:bg-purple-600" onClick={navigateToRecipeList}>Back to Recipe Book</button>
                    <button type="button" 
                    onClick={deleteRecipe}
                    className="flex flex-center px-4 py-2 bg-green-800 text-white rounded hover:bg-purple-600"> Delete Recipe</button>
                </div>
        </div>
    )

}

