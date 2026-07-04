const SearchBox = ({ label, placeholder, value }) => {
    const handleSearchChange = (event) => {
        console.log("handle search function invoked:", event.target.value);
    };

    return (
        <div className="flex flex-1 items-center gap-4 font-primary">
            <label
                htmlFor="search"
                className="whitespace-nowrap text-base font-semibold text-dark"
            >
                {label}
            </label>

            <input
                id="search"
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={handleSearchChange}
                className="
                    w-full
                    rounded-lg
                    border
                    border-stone-300
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-dark
                    shadow-sm
                    transition-all
                    duration-300
                    placeholder:text-stone-400
                    hover:border-primary
                    focus:border-primary
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/25
                "
            />
        </div>
    );
};

export default SearchBox;