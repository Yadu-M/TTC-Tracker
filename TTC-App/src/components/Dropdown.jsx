
export function Dropdown(items) {


    let elements;
    let loaded = false;
    if (items.info !== undefined) {
        loaded = true;
        elements = items.info
    }

    return (
        <div className="routes">
            <h1>{items.title}</h1>
            {loaded && Array.from(elements).map((element, index) => {
                const title = element.attributes && element.attributes.title && element.attributes.title.nodeValue;
                return (
                    <div key={index}> <h6>{title}</h6></div>
                )
            })}
        </div>
    )
}