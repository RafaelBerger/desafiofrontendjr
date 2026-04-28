interface CardProps {
  id: string;
  name: string;
  subject: string;
  owner: string;
  users: string[];
  isAnyCardSelected: boolean;
  isSelected: boolean;
  toggleSelect: (id: string, checked: boolean) => void;
}

export default function Card({
  id,
  name,
  subject,
  owner,
  users,
  isAnyCardSelected,
  isSelected,
  toggleSelect,
}: CardProps) {
  return (
    <div
      onClick={() => toggleSelect(id, !isSelected)}
      className={`${
        isSelected ? "bg-purple-200" : "hover:bg-purple-200"
      } group w-full min-h-20 flex justify-between border cursor-pointer mt-px`}
    >
      <div className="flex w-3/4">
        <div className="flex px-4 md:px-10 items-center">
          <div className="relative w-10 h-10">
            <div
              className={`border rounded-full w-10 h-10 flex justify-center items-center text-purple-600
              ${isAnyCardSelected ? "hidden" : "group-hover:hidden"}`}
            >
              {owner}
            </div>

            <div
              className={`absolute inset-0 flex justify-center items-center
              ${isAnyCardSelected ? "flex" : "hidden group-hover:flex"}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => toggleSelect(id, e.target.checked)}
                className="w-6 h-full"
              />
            </div>
          </div>
          <div className="flex flex-col pl-4">
            <h1 className="font-bold truncate max-w-37.5 md:max-w-none">
              {name}
            </h1>
            <p className="truncate max-w-37.5 md:max-w-none">{subject}</p>
            <p className="text-sm">caixa de entrada</p>
          </div>
        </div>
      </div>

      <div className="flex items-center pr-4 md:pr-10">
        <div className="flex flex-col items-center text-xs md:text-sm">
          <p>Hoje, 12:07</p>

          <div className="flex flex-wrap max-w-25 md:max-w-none">
            {users.map((user, index) => (
              <div
                key={index}
                className="border text-purple-600 rounded-full w-6 h-6 md:w-7 md:h-7 flex justify-center items-center text-[10px] md:text-[12px]"
              >
                {user}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
