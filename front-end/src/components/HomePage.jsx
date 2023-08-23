import { useContext } from "react";
import { userContext } from "../App";
import { useNavigate } from 'react-router-dom';

import pictureOne from '../images/pancakes.jpg'
import pictureTwo from '../images/pizza.jpg'
import pictureThree from '../images/fish.jpg'
import background from '../images/background.jpg'

export const HomePage = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate()

  const navigateToRecipeBooks = () => {
    navigate('/recipe_books')
  }

  const navigateToFindRecipe = () => {
    navigate('/recipes')
  }
  
  const navigateToCreateRecipe = () => {
    navigate('/recipe/create')
  }
  


  return (
 
    <div className = "image"
        style = {{
            height: "100vh",
            width: "100vw",
            backgroundImage:`url(${background})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed"
        }}
        >

  <div className ="flex justify-center mb-20 pt-20">
    <div className="space-x-20 sm:flex sm:justify-center max-w-screen-lg max-h-screen-lg">
  <div
    className="flex flex-col rounded-lg dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
      <img
        className="object-scale-down h-78 w-96 rounded-lg"
        src={pictureTwo}/>
    <div className="p-6">
      <h5
        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        Find New Recipes 
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Looking for a great new recipe? This is the place! 
      </p>
      <button
          type="button"
          onClick={navigateToFindRecipe}
          data-te-ripple-init
          data-te-ripple-color="light"
          class="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out bg-slate-400 hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 ">
          Check Out New Recipes
      </button>
    </div>
  </div>
  <div
    className="flex flex-col rounded-lg dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
      <img
        className="object-scale-down h-78 w-96 rounded-lg"
        src={pictureOne} />
    <div className="p-6">
      <h5
        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        Recipe Books
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Browse through your recipe books here
      </p>
      <button
          type="button"
          onClick={navigateToRecipeBooks}
          data-te-ripple-init
          data-te-ripple-color="light"
          class="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out bg-slate-400 hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700">
          Browse My Recipe Books
      </button>
    </div>
  </div>
  <div
    className="flex flex-col rounded-lg dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
      <img
        className="object-scale-down h-78 w-96 rounded-lg"
        src={pictureThree}/>
    <div className="p-6">
      <h5
        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        Create My Own Recipe
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Already have a recipe you love to make? Add it to a recipe book!
      </p>
      <button
          type="button"
          onClick={navigateToCreateRecipe}
          data-te-ripple-init
          data-te-ripple-color="light"
          class="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out bg-slate-400 hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700">
          Add My Own Recipes
      </button>
    </div>
  </div>
</div>
      </div>
      </div>
  );
};
