const SearchBar = ({value, onChange }) => {
  return (
    <div>
          Search for countries: <input
                    value={value}
                    onChange={onChange}
                  />
        </div>
  )
}

export default SearchBar