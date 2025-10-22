interface Props {
    category: string;
    onChange: (value: string) => void;
}

const categories = ["Any", "Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"];

export const FilterBar: React.FC<Props> = ({ category, onChange }) => {
    return (
        <div className="flex justify-center gap-2 p-4">
            <select
                className="border rounded-lg p-2 text-gray-800"
                value={category}
                onChange={(e) => onChange(e.target.value)}
            >
                {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
                ))}
            </select>
        </div>
    );
};