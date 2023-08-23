import axios from "axios"
import { api } from "../utilities"
import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
// import background from '../images/book.jpg'


export default function RecipePage() {

    // const location = useLocation()     
    // const navigate = useNavigate()

    // let title = ''
    // try {
    //     if (location.state.title === undefined) {
    //     title = "Recipes"
    //     } else {
    //         title = location.state.title
    //     }
    // } 
    // catch {
    //     title = "Recipes"
    // }

    const navigate = useNavigate()
    const { id } = useParams();
    const [recipes, setRecipes] = useState([])


    useEffect(() => {
        async function getRecipeData() {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const headers = { Authorization: `Token ${token}`};
                    const response = await axios.get(`http://127.0.0.1:8000/api/recipe/${id}`, { headers });
                    console.log("API Response: ", response);
                    setRecipes(response.data)
                } else {
                    console.log("No auth token found in local storage.");
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        getRecipeData(); // get all recipe info here to turn into an object - that way you can pass the Django recipe data and the other api data through the same object model so that they are formated the same 
    }, [id]);

    const deleteBook = async (e) => { // delete a recipe book
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            if (token) {
                axios.defaults.headers.common["Authorization"] = `Token ${token}`;
                const response = await api.delete(`recipe_book/${id}`);
                console.log(response.data)
                navigate("/recipe_books/")
            }
            alert("Recipe Book Deleted!")
            window.location.reload();
        }   catch (error) {
            console.error("Error Deleting RecipeBook: ", error);
            alert("Something went wrong")
        }
        
    }

    const navigateToRecipeBooks = () => {
        navigate(`/recipe_books`)
   }

   const navigateToAddRecipe = () => {
    navigate(`/recipe/create/`)
}

   const navigateToRecipeList = (recipeId) => {
    navigate(`/recipe/${id}/${recipeId}/`);
};

    return (
        <div className = "image"
        style = {{
            height: "100vh",
            width: "100vw",
            // backgroundImage:`url(${background})`,
            // backgroundSize: "cover",
            // backgroundAttachment: "fixed"
        }}>
            
            <h1 className="flex justify-center text-6xl pt-40 text font-semibold ">Recipes</h1>
            {recipes.map((recipe) => (
                <div className="flex justify-center mt-20 mb-2 text-4xl" key={recipe.id}>
                    <button type="button" onClick={() => navigateToRecipeList(recipe.id)}>{recipe.title}</button>
                    {/* <div>
                        <button type="button" className="border border-solid border-blue-600 px-4 h-8 rounded-md text-xl"> Delete </button>
                    </div> */}
                </div>
            ))}
            <div className="flex justify-center pt-10 space-x-4">
                <button type="button" className="flex flex-center px-4 py-2 bg-green-800 text-white rounded hover:bg-purple-600" onClick={navigateToRecipeBooks}>Back</button>
                <button type="button" className="flex flex-center px-4 py-2 bg-green-800 text-white rounded hover:bg-purple-600" onClick={navigateToAddRecipe}>Add a Recipe</button>
                <button type="button" onClick={deleteBook}  className="flex flex-center px-4 py-2 bg-green-800 text-white rounded hover:bg-purple-600"> Delete Book</button>
            </div>
        </div>
    )

}