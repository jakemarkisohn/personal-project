import { useState, useEffect } from 'react';
import axios from 'axios';



export default function FindRecipePage() {
    
    const [searchInput, setSearchInput] = useState("")
    const [recipeData, setRecipeData] = useState([]);

    const searchRecipe = async () => {  // search for recipe
      const options = {
          method: 'GET',
          url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
          params: {
              from: '0',
              size: '100',
            },
          };
          try {
              const response = await axios.request(options);
              console.log(response.data);
              setRecipeData(response.data.meals)

          } catch (error) {
              console.error(error);
          }
  };

      useEffect(() => {
        console.log(recipeData)
      }, [recipeData]);

      const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
      }


      const formattedData = recipeData.map((meal, index) => {
        const ingredientList = [];
        for (let i = 1; i <= 20; i++) {
          const measure = meal[`strMeasure${i}`];
          const ingredient = meal[`strIngredient${i}`];
          if(measure && ingredient) {
            ingredientList.push(`-${ingredient}: ${measure}`)
          }
        }
          
        return <div>
          <div className='border-2 border-black mt-12 ml-8 mr-8 mb-8'
                key={index}>
                  <div className='text text-3xl font-semibold p-4'>
                  <div className='mb-4'>
                  {meal.strMeal}
                  </div>
                  <img 
                className='oject-contain h-100 w-100'
                src={meal.strMealThumb}
                ></img>
                  </div>
                  <br />
                  <div className='font-semibold ml-4 mr-4'>
                  Instructions
                  </div>
                  <br/>
                  <div className='ml-4 mr-4'>
                  {meal.strInstructions}
                  </div>
                  <br/><br/>
                  <div className='font-semibold ml-4 mr-4'>
                  Ingredients
                  </div>
                  <br /><br />
                  <div className=' ml-4 mr-4'>
                  {ingredientList.map((ingredient, i) => (
                    <div key={i}>{ingredient}</div>
                  ))}  
                  </div>                
                  <br />
                  <button className='border-2 border-gray-600 m-4 p-2'>Add To Recipe Book</button>
                </div>
          </div>
  })
        
    return (

        <div>

        <div className='flex justify-center pt-20'>
              <div>
                <div className='flex justify-center text-2xl'>
                  <h1>Search For Recipes Here</h1>
                </div>
                <input
                  type="text"
                  name="title"
                  className="w-96 h-8 border border-solid border-blue-800 p-2 rounded-md" 
                  placeholder='Search by name or ingredient'
                  onChange={handleChange}/>
                  <button type="button" className="border border-solid border-blue-600 px-4 h-8 rounded-md" onClick={searchRecipe}>Search</button>
          </div>
          </div>
          <div>{formattedData}</div>
        </div>
        
    )
}