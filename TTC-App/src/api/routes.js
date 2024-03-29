import { xmlToArray } from "../utils/xmlToArray";

const GET_ROUTES = 'https://retro.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc'
const GET_DIRECTIONS = 'https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&terse&a=ttc&r='
const GET_PREDICTION = 'https://retro.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&' //r=95&s=24460_ar


export const get_routes = async () => {

    let routes = [];
    await fetch(GET_ROUTES)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            routes = data.getElementsByTagName('route');
        });
    
    // xmlToArray(routes);
    return xmlToArray(routes, ['tag', 'title', 'tag']);
    
}

export const get_directions = async (route_num) => {
    let directions = [];
    let stops = [];
    let directionData = [];
    let stopsData = [];
    await fetch(`${GET_DIRECTIONS}${route_num}`)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            directions = data.getElementsByTagName('direction');
            stops = data.getElementsByTagName('route');
        });

        if (stops.length !== 0 && directions.length !== 0) {
            stops = stops[0].children;
            
            stopsData = Array.from(stops).map(stop => {
                let tag;
                let title;
                let stopId;
                if (stop.attributes !== undefined) {
                    if (stop.attributes.stopId !== undefined) {
                        tag = stop.attributes.tag.value;
                        title = stop.attributes.title.value;
                        stopId = stop.attributes.stopId.value

                        return {
                            [tag] : {
                                "title": title,
                                "stopId": stopId
                            }
                        }
                    }
                }       
            
                    
            }).reduce((acc, obj) => ({ ...acc, ...obj }), {}); // Merge all objects into a single one


            directionData = Array.from(directions).map(element => {
                const title = element.getAttribute('title');
                const tags = Array.from(element.children).map(e => e.getAttribute('tag'));
                return { [title]: tags };
            });

            const obj =  {
                stopsData,
                directions: Object.assign({}, ...directionData)
            }
    
            return obj;
        }

}

export const get_stops = async (route_num) => {
    let directions = [];
    await fetch(`${GET_DIRECTIONS}${route_num}`)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            directions = data.getElementsByTagName('stop');
        });
    
        return xmlToArray(directions);
}

export const get_predictions = async (route_num, stop_tag) => {
    let predictions = [];
    const url = `${GET_PREDICTION}r=${route_num}&s=${stop_tag}`

    await fetch(url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            predictions = data.getElementsByTagName('predictions');
        });
    
    return predictions;
}

