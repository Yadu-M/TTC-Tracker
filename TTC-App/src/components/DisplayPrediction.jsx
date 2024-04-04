export default function DisplayInfo({ predictions }) {
    return (
      <>
        <h1>Latest Prediction</h1>
        <p><i>Next Available Buses Arriving in:</i></p>
        {predictions.map(element => (
          <div className="prediction">{element["minute"]} minutes<br /></div>
        ))}
      </>
    );
  }