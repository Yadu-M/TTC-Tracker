
export function Dropdown(items) {


    let elements;
    let loaded = false;
    if (items.info !== undefined) {
        loaded = true;
        elements = items.info
        // console.log(elements);
    }

    return (
        <div className="routes">
            <select>
            {loaded && Array.from(elements).map((element, index) => {
                const title = element.attributes && element.attributes.title && element.attributes.title.nodeValue;
                console.log(title)
                return (
                    <option key={index}> <h6>{title}</h6></option>
                )
            })}
            </select>
        </div>
    )
}