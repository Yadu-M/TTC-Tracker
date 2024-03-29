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
  const [selectedRoute, setSelectedRoute] = useState(7);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  // const [predictions, setPredictions] = useState([]);

  const [routesFetched, setRoutesFetched] = useState(false);
  const [routeInfoFetched, setRouteInfoFetched] = useState(false);
  const [directionsFetched, setDirectionsFetched] = useState(false);
  const [predictionsFetched, setPredictionsFetched] = useState(false);


  // const routeNum = 95; // Random bus num for now
  // const stopTag = '24460_ar'; // Random stop tag for now

    useEffect(() => {
      async function fetch_routes() {
        const available_routes = await get_routes();

        if (available_routes !== undefined) {
          setRoutes(clean_routes_data(available_routes));
          setRoutesFetched(true);
        }
      }
      try {
        fetch_routes();
      } catch (error) {
        console.error(error);
      }
    }, [])

    useEffect(() => {      

      async function fetch_stops_directions () {        
        const selected_routes_data = await get_directions(selectedRoute);

        if (selected_routes_data !== undefined) {
          setRouteInfo(selected_routes_data);
          setRouteInfoFetched(true);
        }

        if (routeInfoFetched === true) {
          setDirections(clean_directions_data(routeInfo));
          setDirectionsFetched(true);
        }
      }

      try {       
        fetch_stops_directions(); 
      } catch (error) {
        console.error(error);
      }
      
    }, [selectedRoute, []]);

    return (
        <>
            <h1>Menu</h1>
            {routesFetched && <Dropdown info={routes} title="Routes" onSelect={setSelectedRoute} stringSplitSymbol={'-'}/>}
            {routeInfoFetched && <Dropdown info={directions} title="Directions" onSelect={setSelectedDirection}/>}
            {/* {stopsFetched && <Dropdown info={stops} title="Stops" onSelect={setSelectedStop}/>} */}
            {/* {predictionsFetched && <DisplayInfo predictions={predictions}/>} */}
        </>
    )
}