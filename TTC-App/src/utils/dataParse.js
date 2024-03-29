export function clean_routes_data(routes) {
    let result = {};

    result = routes.map(element => {
        return {
            "title": element.title,
            "value": element.tag
        }
    });

    return result;
}


export function clean_directions_data(info) {

    
    let result = {};

    result = Object.keys(info.directions).map((element, i) => {
        return {
            "title": element,
            "value": element
        }
    })

    return result;    
}