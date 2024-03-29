export function Dropdown({ info, title, onSelect }) {

    let loaded = false;

    if (info !== undefined) {
      loaded = true;
    }
  
    const handleSelectChange = (event) => {
      let selectedValue = parseInt(event.target.value);      
      // console.log(selectedValue);
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
                <option key={index} value={element.value}>
                  {element.title}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
  