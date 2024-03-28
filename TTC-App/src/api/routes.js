const GET_ROUTES = 'https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc'
const GET_DIRECTIONS = 'https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r='
const GET_PREDICTION = 'https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&' //r=95&s=24460_ar


export const get_routes = async () => {

    let routes = [];
    await fetch(GET_ROUTES)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            routes = data.getElementsByTagName('route');
        });
    
    return routes;
    
}

export const get_directions = async (route_num) => {
    let directions = [];
    await fetch(`${GET_DIRECTIONS}${route_num}`)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            directions = data.getElementsByTagName('direction');
        });
    
        // console.log(directions);
    return directions;
}

export const get_stops = async (route_num) => {
    let directions = [];
    await fetch(`${GET_DIRECTIONS}${route_num}`)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            directions = data.getElementsByTagName('stop');
        });
    
        // console.log(directions);
    return directions;
}

export const get_predictions = async (route_num, stop_tag) => {
    let predictions = [];
    const url = `${GET_PREDICTION}r=${route_num}&s=${stop_tag}`

    await fetch(url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            console.log(url)
            // console.log(data);
            // predictions = data.getElementsByTagName('stop');
        });
    
        // console.log(directions);
    return predictions;
}

