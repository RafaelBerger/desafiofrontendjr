interface ButtonProps {
  name: string;
  isDark: boolean;
  onClick?: () => void;
}

export default function Button({ name, isDark, onClick }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`  ${isDark ? "border border-orange-200 rounded-[10px] w-32 h-10 flex justify-center items-center cursor-pointer text-orange-900 bg-orange-200 hover:bg-orange-500 transition-colors" : "border border-orange-600 rounded-[10px] w-32 h-10 flex justify-center items-center cursor-pointer text-white bg-orange-600 hover:bg-orange-500 transition-colors"} `}
    >
      {name}
    </div>
  );
}
