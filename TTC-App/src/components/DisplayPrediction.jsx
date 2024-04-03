
export default function DisplayInfo({ predictions }) {
    
    return (<>
        <h1>Latest Prediction</h1>
        {predictions.map(element => {
            return (
            <h3>{element["minute"]} minutes<br /></h3> 
        )})}
    </>)
}