import { StyleType } from '../api/client';

interface StyleSelectorProps {
  selected: StyleType;
  onSelect: (style: StyleType) => void;
}

const styles: Array<{ value: StyleType; label: string; description: string }> = [
  { value: 'classic', label: 'Classic', description: 'Professional with accent border' },
  { value: 'modern', label: 'Modern', description: 'Dark sidebar layout' },
  { value: 'minimal', label: 'Minimal', description: 'Clean serif style' },
];

export default function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="flex gap-2">
      {styles.map((style) => (
        <button
          key={style.value}
          onClick={() => onSelect(style.value)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            selected === style.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={style.description}
        >
          {style.label}
        </button>
      ))}
    </div>
  );
}





