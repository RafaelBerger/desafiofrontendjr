interface ButtonProps {
  name: string;
  onClick?: () => void;
}

export default function Button({ name, onClick }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className="border rounded-[10px] w-32 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-500 hover:text-white"
    >
      {name}
    </div>
  );
}
