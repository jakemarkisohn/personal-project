import { useState, useEffect } from 'react';
import axios from 'axios';


export default function FindRecipePage() {
    
    const [searchInput, setSearchInput] = useState("")

    // const [recipeData, setRecipeData] = useState({
          
    //   //   // recipe_book_id: '',
    //       title: '',
    //   //     ingredients: '',
    //   //     instructions: '',
    //   //     time: '',
    //   //     category: '',
    //   });

      const responseData = []

    // useEffect(() => { 
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
                'X-RapidAPI-Key': import.meta.env.VITE_SOME_KEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
              }
            };
            try {
                const response = await axios.request(options);
                // setRecipeData({
                //   title: response.data.results.name
                // })
                console.log(response.data);

                for(const result of response.data.results) {
                  if(result.name) {
                    console.log(result.name)
                    // setRecipeData({title: result.name})
                    // responseData.push(result.name)
                  }
                }

            } catch (error) {
                console.error(error);
            }
    };
  // }, [recipeData])

      const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
      }

      const listItems = responseData.map((title) => {
        <li>{title}</li>
      })

    
    return (

        <div className="grid justify-center mt-20 mb-2 text-xl">
        <h1>Search for new recipes here</h1>
        <div>
            
            <input
            type='text'
            placeholder='Search by name or ingredient'
            // className=''
            onChange={handleChange}
            // value={searchInput}
            />
            <button onClick={searchRecipe}>Search</button>
            <div>
            {/* {recipeData} */}
            </div>

            <ul>{listItems}</ul>

            {/* <ul>
               {responseData.map((title, index) => {
                <li key={index}>{title}</li>
               })}
            </ul> */}
        </div>
        </div>
    )
}