import Child from './Child.js'

const ChildDisplay = ({ children, handleButtonClick }) => {
    return(
      <div>
      { children.map(child => <Child key={child.name.common} child={child} handleButtonClick={() => handleButtonClick(child.name.common)} /> ) }
    </div>
    )
  }

export default ChildDisplay