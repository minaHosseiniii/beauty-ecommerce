export default function Price({currency, price}) {
    return (
        <div className="bg-lighter text-primary font-medium text-sm py-2 px-4 rounded-tl-md">
            {currency}
            <span>{price}</span>
        </div>
    );
}