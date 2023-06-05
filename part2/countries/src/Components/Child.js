const Child = ({child, handleButtonClick}) => (
    <p id={child.name.common}>{child.name.common}<button onClick={handleButtonClick}>Show</button></p>
  )

export default Child