
export default function DropDown({ info, title, onSelect, attributes }) {
  let loaded = false;

  if (info !== undefined) {
    loaded = true;
    // console.log(info);
  }

  const handleSelectChange = (event) => {
    let selectedValue = event.target.value;      
    onSelect(selectedValue);
  };

  return (
    <div className={title}>
      <h1>{title}</h1>
      <select onChange={handleSelectChange}>
        {loaded &&
          info.map((element, index) => {
            // console.log(element);
            return (
              <option key={index} value={element[attributes.value]}>
              {element[attributes.title]}
              </option>
            );
          })}
      </select>
    </div>
  );
}
  