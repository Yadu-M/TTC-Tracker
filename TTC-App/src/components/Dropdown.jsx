
export default function DropDown({ info, title, onSelect, attributes }) {

  const handleSelectChange = (event) => {
    let selectedValue = event.target.value;      
    onSelect(selectedValue);
  };

  return (
    <div className={title}>
      <h1>{title}</h1>
      <select onChange={handleSelectChange}>
        {info.map((element, index) => {
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
  