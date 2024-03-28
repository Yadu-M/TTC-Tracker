import { Dropdown } from "./Dropdown"
import { DisplayInfo } from "./DisplayInfo"
import { useEffect } from "react";
import { get_routes, get_directions, get_stops, get_predictions } from "../api/routes";
import { useState } from "react";

export function Menu() {

  const [routes, setRoutes] = useState([]);    
  const [directions, setDirections] = useState([]);
  const [stops, setStops] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const [routesFetched, setRoutesFetched] = useState(false);
  const [directionsFetched, setDirectionsFetched] = useState(false);
  const [stopsFetched, setStopsFetched] = useState(false);
  const [predictionsFetched, setPredictionsFetched] = useState(false);


  const routeNum = 95; // Random bus num for now
  const stopTag = '24460_ar'; // Random stop tag for now

    useEffect(() => {
        
      const fetchRoutes = async () => {
        try {
            const fetchedRoutes = await get_routes();
            const fetchedDirections = await get_directions(routeNum);
            const fetchedStops = await get_stops(routeNum);
            const fetchedPredictions = await get_predictions(routeNum, stopTag)


            setRoutes(fetchedRoutes);
            setRoutesFetched(true);

            setDirections(fetchedDirections);
            setDirectionsFetched(true);

            setStops(fetchedStops);
            setStopsFetched(true);

            setPredictions(fetchedPredictions);
            setPredictionsFetched(true);
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
      };

    fetchRoutes();
      
    }, []);

    return (
        <>
            <h1>Menu</h1>
            {routesFetched && <Dropdown info={routes} title="Routes"/>}
            {directionsFetched && <Dropdown info={directions} title="Directions"/>}
            {stopsFetched && <Dropdown info={stops} title="Stops"/>}
            {predictionsFetched && <DisplayInfo predictions={predictions}/>}
        </>
    )
}