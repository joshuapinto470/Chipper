const SearchBar = () => {
    return (
        <div className="relative text-gray-300 w-80 p-5">
            <button type="submit" className="absolute ml-4 mt-3 mr-4">
            </button>

            <input type="search" name="search" placeholder="Search Twitter"
                className=" bg-dim-700 h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow border-0" />
        </div>
    )
}

export default SearchBar