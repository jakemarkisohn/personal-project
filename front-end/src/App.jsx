import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { createContext } from "react";
import { api } from "./utilities";

export const userContext = createContext()

function App() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user);
    }, [user]);

    const whoAmI = async () => {
        let token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            let response = await api.get("users/");
            setUser(response.data)
        } else {
            setUser(null);
            delete api.defaults.headers.common["Authorization"];
            navigate("login");
        }
    };

    useEffect(() =>{
        whoAmI()
    }, []);

    const logOut = async() => {
        try{
        await api.post("users/logout/");
        localStorage.removeItem("token");
        setUser(null)
        delete api.defaults.headers.common["Authorization"];
        navigate("/login");
    } catch (error) {
        console.error("Error:", error)
    }};


    return (
        <div>
        <div id="app">
            <header>
              <nav>
                {
                user
                ?
                <>
                <div className="flex items-center justify-center space-x-10 bg-slate-400">
                    <Link 
                        to="/home"
                        className="px-5 py-2 bg-green-800 text-white rounded hover:bg-purple-600">
                        Home
                    </Link>   
                    <div className="flex items-center justify-center font-serif text-6xl mb-5 text-decoration-line: underline ">
                        <h1>Welcome to Recipe Radar</h1>
                    </div>
                    <button onClick={logOut}
                        className="px-4 py-2 bg-green-800 text-white rounded hover:bg-purple-600">
                        Log Out
                    </button>
                </div>
                </>
                :
                <>
                </>
                }
              </nav>
            </header>
            <userContext.Provider value={{ user, setUser}}>
                <Outlet />
            </userContext.Provider>
        </div>
        </div>
    );
};

export default App;