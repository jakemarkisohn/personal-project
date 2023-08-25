import { useState, useEffect } from 'react';
import axios from 'axios';



export default function FindRecipePage() {
    
    const [searchInput, setSearchInput] = useState("")
    const [randomRecipeData, setRandomRecipeData] = useState([]);
    const [recipeDataTwo, setRecipeDataTwo] = useState([]);


      const searchRandomRecipe = async () => {  // get a random recipe
      const options = {
          method: 'GET',
          url: 'https://www.themealdb.com/api/json/v1/1/random.php',
          };
          try {
              const response = await axios.request(options);
              console.log(response.data);
              setRandomRecipeData(response.data.meals)
              
          } catch (error) {
              console.error(error);
          }
  };

  const searchRecipeTwo = async () => {  // search for recipe videos
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {
            from: '0',
            size: '100',
            q: `${searchInput}`
          },
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_SOME_KEY,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
          }
        };
        try {
            const response = await axios.request(options);
            console.log(response.data);
            setRecipeDataTwo(response.data.results)
            
        } catch (error) {
            console.error(error);
        }
};

      useEffect(() => {
        console.log(recipeDataTwo)
      }, [recipeDataTwo]);

      const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
      }


      const formattedRandomRecipe = randomRecipeData.map((meal, index) => {
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
                  <div className='mb-4 '>
                  {meal.strMeal}
                  </div>
                  <img 
                className='oject-contain w-96 h-96'
                src={meal.strMealThumb}
                ></img>
                  </div>
                  <div className='font-semibold ml-4 mr-4 pb-4'>
                  Instructions:
                  </div>
                  <div className='ml-4 mr-4 pb-4'>
                  {meal.strInstructions}
                  </div>
                  <div className='font-semibold ml-4 mr-4 pb-4'>
                  Ingredients:
                  </div>
                  <div className=' ml-4 mr-4 pb-4'>
                  {ingredientList.map((ingredient, i) => (
                    <div key={i}>{ingredient}</div>
                  ))}  
                  </div>                
                  {/* <button className='border-2 border-gray-600 m-4 p-2'>Add To Recipe Book</button> */}
                  <button onClick={() => window.open(meal.strYoutube, "_blank")} className='border-2 border-gray-600 m-4 p-2'>Watch Here</button>
                </div>
          </div>
  })


  const formattedDataTwo = recipeDataTwo.map((meal, index) => (
    <div>
    <div className='border-2 border-black mt-12 ml-8 mr-8 mb-8'
    key={index}>
     <div className='text text-3xl font-semibold p-4'>
     <div className='mb-4'>
      {meal.name}
      </div>
      <img 
      className='oject-contain  h-96'
      src={meal.thumbnail_url}/>
      </div>
     <div className='font-semibold ml-4 mr-4 pb-4'>
      Instructions
      </div>
      <div className='ml-4 mr-4 pb-4'>
      {meal.instructions.map((instructions, index) => (
        <div key={index}>{instructions.display_text}</div>
      ))}
     </div>
     <div className=' ml-4 mr-4 pb-4'>
      {meal.sections[0].components.map((ingredients, index) => (
        <div key={index}>{ingredients.raw_text}</div>
      ))}
     </div>
    {/* <button className='border-2 border-gray-600 m-4 p-2'>Add To Recipe Book</button> */}
    <button onClick={() => window.open(meal.original_video_url, "_blank")} className='border-2 border-gray-600 m-4 p-2'>Watch Here</button>
    </div>
    </div>
  ))
        
    return (

        <div className='bg-gradient-to-r from-emerald-500 to-emerald-800 bg-cover min-h-screen'>
        <div className='flex justify-center pt-20'>
              <div>
                <div className='flex justify-center text-3xl pb-4'>
                  <h1>Search For Recipes Here</h1>
                </div>
                <input
                  type="text"
                  name="title"
                  className="w-96 h-8 border border-solid border-blue-800 py-1.5 px-4 rounded-md" 
                  placeholder='Search by name or ingredient'
                  onChange={handleChange}/>
                  <button type="button" className="bg-purple-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-md" onClick={searchRecipeTwo}>Search</button>
                  {/* <button type="button" className="bg-purple-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-md" onClick={event => { searchRecipeOne(); searchRecipeTwo()}}>Search</button> */}
                  <div className='flex flex-col justify-center pt-10'>
                    <div className='flex justify-center'>
                    <h1>Feeling Adventurous? How about a random recipe?</h1>
                    </div>
                  <button className="bg-purple-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-md"
                  type='button' onClick={searchRandomRecipe}>Random Recipe</button>
                  </div>
                  <div>
                   
                  </div>
                  
          </div>
          </div>          
          <div>{formattedDataTwo}</div>
          <div>{formattedRandomRecipe}</div>
        </div>
        
    )
}
