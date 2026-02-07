export function Select({ children }) {
    return <div className="relative">{children}</div>;
  }
  
  export function SelectTrigger({ children, className }) {
    return (
      <button className={`border px-4 py-2 rounded ${className}`}>
        {children}
      </button>
    );
  }
  
  export function SelectContent({ children }) {
    return <div className="absolute bg-white shadow rounded">{children}</div>;
  }
  
  export function SelectItem({ value, children }) {
    return (
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" data-value={value}>
        {children}
      </div>
    );
  }
  
  export function SelectValue({ placeholder }) {
    return <span>{placeholder}</span>;
  }