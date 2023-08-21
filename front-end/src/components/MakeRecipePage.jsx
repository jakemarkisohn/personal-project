import { useState, useEffect } from 'react';
// import background from '../images/blankpage.jpeg'
import axios from 'axios'
export default function MakeRecipePage() {
   
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        time: '',
        category: '',
        recipeBookId: ''
    });

    const [recipeBooks, setRecipeBooks] = useState([])

    useEffect(() => {
        async function getRecipeBookData() {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const headers = { Authorization: `Token ${token}` };
                    const response = await axios.get("http://127.0.0.1:8000/api/recipe_book/", { headers });
                    console.log("API Response:", response);
                    setRecipeBooks(response.data);
                } else {
                    console.log("No auth token found in local storage.");
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        getRecipeBookData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRecipeBookSelect = (event) => {
        const selectedRecipeBookId = event.target.value;
        setRecipeData((prevData) => ({
            ...prevData,
            recipeBookId: selectedRecipeBookId
        }));
    };

    const handleSubmit = () => {
        // send recipe data to database
        console.log(recipeData)
    }

    return (

    <div className = "image"
        // style = {{height: "100%",width: "100%",backgroundImage:`url(${background})`,backgroundSize: "cover",}}
        >
        <div class="flex justify-center mb-2 text-4xl"> 
            <div class="mx-auto w-full max-w-[550px]">
                <div className="p-8 ml-14">
                    <h1>Create My Own Recipe</h1>   
                </div>
                    <div class="mb-5">
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                            Title
                        </label>
                        <input 
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Exp: Strawberry Smoothie"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                            value={recipeData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="mb-5">
                        <label for="message"class="mb-3 block text-base font-medium text-[#07074D]">
                            Ingredients
                        </label>
                        <textarea
                            rows="4"
                            name="ingredients"
                            id="ingredients"
                            placeholder="Exp: 120g strawberries, 130g greek yogurt, 120 ml almond milk"
                            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                            value={recipeData.ingredients}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div class="mb-5">
                        <label for="message" class="mb-3 block text-base font-medium text-[#07074D]">
                            Instructions
                        </label>
                        <textarea
                            rows="4"
                            name="instructions"
                            id="instructions"
                            placeholder="Exp: place everything in blender, blend until smooth"
                            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                            value={recipeData.instructions}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div class="mb-5">
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                            Time
                        </label>
                        <input
                            type="text"
                            name="time"
                            id="time"
                            placeholder="Exp: 5 minutes"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                            value={recipeData.time}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div class="mb-5">
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                            Category
                        </label>
                        <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Exp: Smoothies"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                        value={recipeData.category}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-5'>
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                            Select Recipe Book
                        </label>
                        <select
                        name="recipeBookId"
                        id="recipeBookId"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-400 focus:shadow-md"
                        value={recipeData.recipeBookId}
                        onChange={handleRecipeBookSelect}>
                        <option value=''>Select a Recipe Book</option>
                        {recipeBooks.map((recipeBook) => (
                            <option key={recipeBook.id} value={recipeBook.id}>
                                {recipeBook.title}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className='pl-16 pt-4 space-x-10'>
                        <button class="hover:bg-yellow-800 rounded-md bg bg-green-800 py-3 px-8 pt-2 text-base font-semibold text-white outline-none">Back</button>
                        <button class="hover:bg-yellow-800 rounded-md bg bg-green-800 py-3 px-8 pt-2 text-base font-semibold text-white outline-none" 
                        // onClick={handleSubmit}
                        >Submit</button>
                        <button class="hover:bg-yellow-800 rounded-md bg bg-green-800 py-3 px-8 pt-2 text-base font-semibold text-white outline-none">Clear</button>
                    </div>
                </div>
            </div>
        </div>
    
    )
}