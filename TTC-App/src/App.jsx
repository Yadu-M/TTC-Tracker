import { Menu } from "./components/Menu";
import { get_routes } from "./api/routes";
import { useEffect, useState } from "react";
import logo from "./ttc.png"; // Import the image file
import "./App.css";

function App() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const getRoutes = async () => {
      const data = await get_routes();
      setRoutes(data);
    };

    getRoutes();
  }, []);

  return (
    <div className="container">
      <img src={logo} alt="TTC Logo" className="logo" />
      {routes.length && <Menu route_info={routes} />}
    </div>
  );
}

export default App;
