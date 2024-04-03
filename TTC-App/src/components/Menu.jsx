import { useEffect, useState } from "react";
import { get_directions, get_stops, get_predictions } from "../api/routes";
import DropDown from "./DropDown"
import DisplayInfo from "./DisplayPrediction"

export function Menu({ route_info }) {
  
  const routes = route_info;

  // const [userRouteInfo, setUseRouteInfo] = useState([]);
  const [routeDirections, setRouteDirections] = useState([]);
  const [routeStops, setRouteStops] = useState([]);

  const [userRoute, setUserRoute] = useState(routes[0]["tag"]);
  const [userDirection, setUserDirection] = useState("South - 7 Bathurst towards Bathurst Station");
  const [userStop, setUserStop] = useState([]);
  const [predictions, setPredictions] = useState([]);

  // Updates the directions
  useEffect(() => {
    async function get_route_directions() {
      const data = await get_directions(userRoute);  
      setRouteDirections(data);
      setUserDirection(data[0]["direction"])
    }    
    get_route_directions();

  }, [userRoute])

  // Updates stops
  useEffect(() => {
    async function get_route_stops() {
      const data = await get_stops(userRoute, userDirection);  
      setRouteStops(data);
      setUserStop(data[0]["tag"]);
    }
    get_route_stops();
  }, [userRoute, userDirection])


  useEffect(() => {
    async function get_prediction() {
      const data = await get_predictions(userRoute, userStop);
      setPredictions(data);
    }

    get_prediction();
  }, [userRoute, userStop])

  return (
    <>
      <h1>Menu</h1>
      {routes.length && <DropDown info={routes} title="Routes" onSelect={(item) => setUserRoute(item)} attributes={{"title": "title", "value": "tag"}}/>}
      {routeDirections.length && <DropDown info={routeDirections} title="Directions" onSelect={(item) => setUserDirection(item)} attributes={{"title": "direction", "value": "direction"}}/>}
      {routeStops.length && <DropDown info={routeStops} title="Stops" onSelect={(item) => setUserStop(item)} attributes={{"title": "title", "value": "tag"}}/>}
      {predictions.length && <DisplayInfo predictions={predictions}/>}
    </>
  );
}
