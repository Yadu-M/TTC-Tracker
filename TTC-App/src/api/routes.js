const GET_ROUTES = 'http://127.0.0.1:8000/routes'
const GET_DIRECTIONS_STOPS = 'http://127.0.0.1:8000/directions_stops/' //route num
const GET_DIRECTIONS = 'http://127.0.0.1:8000/directions/'
const GET_STOPS = 'http://127.0.0.1:8000/stops/' // 9/South%20-%209%20Bellamy%20towards%20Warden%20Station
const GET_PREDICTION = 'http://127.0.0.1:8000/predictions/' //route num / stop id


export async function get_routes() {
    try {
        const response = await fetch(GET_ROUTES);
        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching routes:', error);
        throw error; // Propagate the error so it can be caught by the caller
    }
}

export async function get_route_info(route_num) {
    try {
        const response = await fetch(`${GET_DIRECTIONS_STOPS}${route_num}`);
        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching routes:', error);
        throw error; // Propagate the error so it can be caught by the caller
    }
}

export async function get_directions(route_num) {
    try {
        const response = await fetch(`${GET_DIRECTIONS}${route_num}`);
        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching routes:', error);
        throw error; // Propagate the error so it can be caught by the caller
    }
}

export async function get_stops(route_num, directions) {
    try {
        // console.log(route_num, directions);
        const response = await fetch(`${GET_STOPS}${route_num}/${directions}`);
        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching routes:', error);
        throw error; // Propagate the error so it can be caught by the caller
    }
}

