import { useState, useContext } from "react";
import { userContext } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utilities";
// import videoBg from '../video/background-video.mp4'

export const LoginPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(userContext);
    const navigate = useNavigate()

    const logIn = async (e) => {
      e.preventDefault();
      try {
          let response = await api.post("users/login/", {
              email: userName,
              password: password,
          });
          let user = response.data.user;
          let token = response.data.token;
          setUser(user);
          localStorage.setItem("token", token);
          api.defaults.headers.common["Authorization"] = `Token ${token}`;
          navigate("/home");
      } catch (error) {
          console.error("Login Error:", error);
          // Handle the login error here
          alert("Incorrect Credentials"); // You can also show a more user-friendly error message
      }
  };
  

    return (
      
      <div className="relative">
      {/* <video src={videoBg} autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0" /> */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative z-10">
      <div>
        <h1 className="font-serif text-8xl mt-10 mb-10 text-red-800">Recipe Radar</h1>
      </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
      <form onSubmit={(e) => logIn(e)} class="space-y-4 md:space-y-6" action="#">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" 
          value={userName}
          onChange={(e) => setUserName(e.target.value)}/>
      </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
      <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
  Don't have an account yet?{' '}
  <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
    Sign up
  </Link>
</p>
    
    </form>
    </div>
    </div>
    </div>
    </div> 
)};