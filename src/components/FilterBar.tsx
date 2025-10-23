import { Listbox,ListboxButton,ListboxOption,ListboxOptions} from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

interface Props {
    category: string;
    onChange: (value: string) => void;
}

const categories = ["Any", "Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"];

export const FilterBar: React.FC<Props> = ({ category, onChange }) => {
    return (
        <section className="flex justify-center gap-2 p-4 relative">
            <Listbox value={category} onChange={onChange}>
                <div className="relative w-64 md:w-80 ">
                    
                    {/* Botón de control: Estilos del input cerrado */}
                    <ListboxButton 
                        className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 shadow-md
                        focus:outline-none focus:ring-2 focus:ring-[#47967B] hover:border-[#6A1B9A] transition
                        flex justify-between items-center bg-white"
                    >
                        <span>{category}</span>
                        <FaChevronDown className="w-5 h-5 text-gray-500" />
                    </ListboxButton>

                
                    {/* Lista de opciones */}
                    <ListboxOptions 
                        className="absolute z-10 mt-1 w-full max-h-80 overflow-auto 
                        rounded-xl bg-c-yellow shadow-lg focus:outline-none 
                        border border-gray-200"
                    >
                        {categories.map((cat) => (
                            <ListboxOption
                                key={cat}
                                value={cat}
                                className={({ active, selected }) =>
                                    `cursor-pointer select-none p-2 px-4 
                                    ${active ? 'bg-[#d9c5f7]' : ''} 
                                    ${selected ? 'font-semibold text-[#6A1B9A]': 'text-gray-800'}`
                                }
                                >
                                    {cat}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    
                </div>
            </Listbox>
        </section>
    );
};