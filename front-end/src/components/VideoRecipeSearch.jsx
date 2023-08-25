import { useState, useEffect } from 'react';
import axios from 'axios';



export default function FindRecipeVideoPage() {
    
    const [searchInput, setSearchInput] = useState("")

    const [recipeVideoData, setrecipeVideoData] = useState([]);


    const searchRecipeVideo = async () => {  // search for recipe videos
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
                setrecipeVideoData(response.data.results)

            } catch (error) {
                console.error(error);
            }
    };



      useEffect(() => {
        console.log(recipeVideoData)
      }, [recipeVideoData]);

      const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
      }

    
    return (

        <div className='bg-gradient-to-r from-green-700 to-lime-400 bg-cover min-h-screen'>

            <div className='flex justify-center pt-20 '>
              <div>
                <div className='flex justify-center text-3xl pb-4 font-semibold'>
                  <h1>Search For Videos Here</h1>
                </div>
                <input
                  type="text"
                  name="title"
                  className="w-96 h-8 border border-solid border-blue-800 py-1.5 px-4 rounded-md" 
                  placeholder='Search by name or ingredient'
                  onChange={handleChange}/>
                  <button type="button" className="bg-purple-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-md" onClick={searchRecipeVideo}>Search</button>
          </div>
           
          </div>

            <div className=''>
            <ul className="grid justify-center mt-20 mb-2 ml-10 mr-10 text-xl ">
              <div className="p-6 gap-20 flex flex-wrap ">
               {recipeVideoData.map((meal, index) => (
                <div className='flex flex-col border-2 w-96 p-2'>
                <div className='font-semibold flex justify-center pt-4'
                key={index}>{meal.name}
                </div>
                <a href={meal.original_video_url} target="_blank">
                <img 
                className='oject-contain h-60 w-80 pl-8 pb-2'
                src={meal.thumbnail_url}
                ></img>
                </a>
                </div>
               ))}
               </div>
            </ul>
          </div>
        </div>
        
    )
}