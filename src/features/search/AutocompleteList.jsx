
export default function AutocompleteList({
  suggestions,
  activeIndex,
  onSelect
}){
  return (
    <ul
      role="listbox"
      className="absolute w-full mt-1 bg-white/10 backdrop-blur rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
    >
      {suggestions.map((item,index)=>(
        <li
          key={item}
          role="option"
          aria-selected={activeIndex===index}
          onClick={()=>onSelect(item)}
          className={`px-4 py-2 cursor-pointer ${
            activeIndex===index
              ? 'bg-white/20'
              : 'hover:bg-white/10'
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
