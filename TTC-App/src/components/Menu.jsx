import { Dropdown } from "./Dropdown"
import { DisplayInfo } from "./DisplayInfo"
import { useEffect } from "react";
import { get_routes, get_directions, get_stops, get_predictions } from "../api/routes";
import { useState } from "react";
import { clean_directions_data, clean_routes_data } from "../utils/dataParse";

export function Menu() {

  const [routes, setRoutes] = useState({});    
  const [routeInfo, setRouteInfo] = useState({});
  const [directions, setDirections] = useState([]);
  const [stops, setStops] = useState([]);
  const [predictions, setPredictions] = useState([]);

  // Selected stops by user
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);

  const [routesFetched, setRoutesFetched] = useState(false);
  const [routeInfoFetched, setRouteInfoFetched] = useState(false);
  const [directionsFetched, setDirectionsFetched] = useState(false);
  const [predictionsFetched, setPredictionsFetched] = useState(false);

  useEffect(() => {
    async function fetch_routes() {
      const available_routes = await get_routes();
      setSelectedRoute(7); // Default route
      if (available_routes !== undefined) {
        setRoutes(clean_routes_data(available_routes));
        setRoutesFetched(true);
      }
    }

    fetch_routes();
  }, []);

  useEffect(() => {      
    async function fetch_stops_directions() {
      if (selectedRoute !== null) {
        const selected_routes_data = await get_directions(selectedRoute);

        if (selected_routes_data !== undefined) {
          setRouteInfo(selected_routes_data);
          setRouteInfoFetched(true);
        }
      }
    }

    fetch_stops_directions(); 
  }, [selectedRoute]);

  useEffect(() => {
    if (routeInfoFetched) {
      setDirections(clean_directions_data(routeInfo));
      setDirectionsFetched(true);
    }
  }, [routeInfoFetched, routeInfo]);

  return (
    <>
      <h1>Menu</h1>
      {routesFetched && <Dropdown info={routes} title="Routes" onSelect={setSelectedRoute} stringSplitSymbol={'-'}/>}
      {routeInfoFetched && <Dropdown info={directions} title="Directions" onSelect={setSelectedDirection}/>}
      {/* {stopsFetched && <Dropdown info={stops} title="Stops" onSelect={setSelectedStop}/>} */}
      {/* {predictionsFetched && <DisplayInfo predictions={predictions}/>} */}
    </>
  );
}
