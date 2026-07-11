import {FaSearch} from "react-icons/fa";

const SearchBox = ({
                       label,
                       placeholder,
                       value,
                       handleSearch,
                   }) => {
    return (
        <div
            className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                flex-1
                gap-3
                sm:gap-4
                font-primary
            "
        >
            <label
                htmlFor="search"
                className="
        whitespace-nowrap
        text-base
        font-semibold
        text-dark
        dark:text-[#E9E6DD]
        transition-colors
        duration-300
    ">
                {label}
            </label>

            <div className="relative w-full">
                <FaSearch
                    className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-sm
        text-stone-400
        dark:text-[#A8AE9E]
        pointer-events-none
    "
                />

                <input
                    id="search"
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={handleSearch}
                    className="
        w-full
        rounded-lg
        border
        border-stone-300
        dark:border-[#2B3328]
        bg-white
        dark:bg-[#171A16]
        pl-11
        pr-4
        py-2.5
        text-sm
        text-dark
        dark:text-[#E9E6DD]
        shadow-sm
        dark:shadow-black/20
        transition-all
        duration-300
        placeholder:text-stone-400
        dark:placeholder:text-[#A8AE9E]
        hover:border-primary
        dark:hover:border-primary
        focus:border-primary
        dark:focus:border-primary
        focus:outline-none
        focus:ring-2
        focus:ring-primary/25
    "
                />
            </div>
        </div>
    );
};

export default SearchBox;