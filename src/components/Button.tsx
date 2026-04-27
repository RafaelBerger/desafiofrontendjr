interface ButtonProps {
  name: string;
}

export default function Button({ name }: ButtonProps) {
  return (
    <div className="border rounded-[10px] w-32 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-500 hover:text-white">
      {name}
    </div>
  );
}
