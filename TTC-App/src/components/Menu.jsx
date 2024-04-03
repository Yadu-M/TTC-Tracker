import { useEffect, useState } from "react";
import { get_route_info, get_directions } from "../api/routes";
import DropDown from "./DropDown"

export function Menu({ route_info }) {
  
  const routes = route_info;

  const [userRouteInfo, setUseRouteInfo] = useState([]);
  const [routeDirections, setRouteDirections] = useState([]);

  const [userRoute, setUserRoute] = useState(routes[0]["tag"]);
  const [userDirection, setUserDirection] = useState("South - 7 Bathurst towards Bathurst Station");
  const [userStops, setUserStops] = useState([]);

  // Fetches the user route direction
  useEffect(() => {
    // async function get_route_data() {
    //   const data = await get_route_info(userRoute);  
    //   setUseRouteInfo(data);
    // }
    async function get_route_directions() {
      const data = await get_directions(userRoute);  
      setRouteDirections(data);
    }    
    // get_route_data();
    async function get_route_stops() {
      
    }
    get_route_directions();

  }, [userRoute])


  // Fetches the user stop
  useEffect(() => {

  }, [userRoute])



  return (
    <>
      <h1>Menu</h1>
      {/* {userRouteInfo.length && console.log(userRouteInfo)} */}\
      {routeDirections.length && console.log(routeDirections)}
      {routes.length && <DropDown info={routes} title="Routes" onSelect={(item) => setUserRoute(item)} attributes={{"title": "title", "value": "tag"}}/>}
      {routeDirections.length && <DropDown info={routeDirections} title="Directions" onSelect={(item) => setUserDirection(item)} attributes={{"title": "direction", "value": "direction"}}/>}
      {/* {stopsFetched && <Dropdown info={stops} title="Stops" onSelect={setSelectedStop}/>} */}
      {/* {predictionsFetched && <DisplayInfo predictions={predictions}/>} */}
    </>
  );
}
