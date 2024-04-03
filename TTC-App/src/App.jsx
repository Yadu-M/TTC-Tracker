import { Menu } from "./components/Menu";
import { get_routes } from "./api/routes"
import { useEffect } from "react";
import { useState } from "react";
import './App.css'

function App() {

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const getRoutes = async () => {
      const data = await get_routes();
      setRoutes(data);
    }

    getRoutes();
  }, [])

  return (
    <>
      {routes.length && <Menu route_info={routes}/>}
    </>
  )
}

export default App;
