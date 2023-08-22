import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FindRecipePage() {
    
    const [searchInput, setSearchInput] = useState("")

    // const [recipeData, setRecipeData] = useState({
    //     recipe_book_id: '',
    //     title: '',
    //     ingredients: '',
    //     instructions: '',
    //     time: '',
    //     category: '',
    // });


    
    const searchRecipe = async (e) => {  // send recipe data to database
        e.preventDefault()

        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {
                from: '0',
                size: '20',
                q: `${searchInput}`
              },
              headers: {
                'X-RapidAPI-Key': '94eebc2103msh8574514499c08e7p1575b3jsn3418be20ddbd',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
              }
            };
            try {
                const response = await axios.request(options);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }

    
    //     try {
    //             const response = await async.get(`https://tasty.p.rapidapi.com/recipes/auto-complete${searchInput}`, {headers: {
    //                 'X-RapidAPI-Key': '94eebc2103msh8574514499c08e7p1575b3jsn3418be20ddbd',
    //                 'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    //               }})
    //             console.log(response.data)
    //     } catch (error) {
    //         alert("No recipes found. Please try again!")
    //     }
    };

      const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
      }
    
    return (
//     <div class="mt-20 mb-2 text-xl">
//         <h1>Search for new recipes here</h1>
//     <form>   
//         <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//         <div class="relative">
//             <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//             </svg>
//             </div>
//             <input type="search" id="default-search" class="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:border-green-800" placeholder="Search Mockups, Logos..." required/>
//             <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-800 dark:hover:bg-green-800 dark:focus:ring-green-800">Search</button>
//     </div>
//     </form>
// </div>

        <div className="grid justify-center mt-20 mb-2 text-xl">
        <h1>Search for new recipes here</h1>
        <div>
            
            <input
            type='text'
            placeholder='Search by name or ingredient'
            onChange={handleChange}
            // value={searchInput}
            />
            <button onClick={searchRecipe}>Search</button>
            {/* <ul>
                <li>{response.data.name}</li>
            </ul> */}
        </div>
        </div>
    )
}