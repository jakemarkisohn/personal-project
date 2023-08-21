import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import AllRecipeBookPage from "./components/AllRecipeBookPage";
import FindRecipePage from "./components/FindRecipePage";
import MakeRecipePage from "./components/MakeRecipePage";
import App from "./App";
import RecipePage from "./components/RecipePage";
import SingleRecipePage from "./components/SingleRecipe";


const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        children: [
            {
                index: true,
                element: <RegisterPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "home",
                element: <HomePage />
            },
            {
                path: "recipe_books",
                element: <AllRecipeBookPage />
            },
            {
                path: "recipes",
                element: <FindRecipePage />
            },
            {
                path: "recipe/create/",
                element: <MakeRecipePage />
            },
            {
                path: "recipe/:id",
                element: <RecipePage />
            },
            {
                path: "recipe/:recipeBookId/:recipeId",
                element: <SingleRecipePage />
            }


        ]
    }
]);

export default router
