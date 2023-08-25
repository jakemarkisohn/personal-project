// const [recipeData, setRecipeData] = useState({
//     recipe_book_id: '',
//     title: '',
//     ingredients: '',
//     instructions: '',
//     time: '',
//     category: '',
// });

// function convertRecipeData(response){
//     const formattedData = {
//         recipe_book_id: '',
//         title: response.data.meals[0].strMeal,
//         ingredients: '',
//         instructions: response.data.meals[0].strInstructions.split('. '),
//         time: ' ',
//         category: response.data.meals[0].strCategory,
//     }
    
//     for (let i = 1; i <= 20; i++) {
//       const measure = meal[`strMeasure${i}`];
//       const ingredient = meal[`strIngredient${i}`];
//       if(measure && ingredient) {
//         formattedData.ingredients += `-${ingredient}: ${measure}`
//       }
//     }
//     return formattedData
// } 
