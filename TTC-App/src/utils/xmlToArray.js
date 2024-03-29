export function xmlToArray(xmlObj, properties) {
    const data = Array.from(xmlObj).map((element, index) => {
        const obj = {};
        properties.forEach(property => {
            if (element.attributes[property]) {
                obj[property] = element.attributes[property].value;
            }
        });
        return obj;
    });
    return data;
}
