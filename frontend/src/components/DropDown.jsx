const DropDown = ({ label, options, selectedValue }) => {
    return (
        <div className="flex flex-1 items-center justify-end gap-4 font-primary">

            <label
                htmlFor="sort"
                className="whitespace-nowrap text-base font-semibold text-dark"
            >
                {label}
            </label>

            <select
                id="sort"
                value={selectedValue}
                className="
                    w-52
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
                    hover:border-primary
                    focus:border-primary
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/25
                    cursor-pointer
                "
            >
                {options.map((optionValue, index) => (
                    <option
                        key={index}
                        value={optionValue}
                    >
                        {optionValue}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default DropDown;