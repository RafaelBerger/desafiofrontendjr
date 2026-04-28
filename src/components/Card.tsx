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
  id, // ✅ IMPORTANTE (faltava usar)
  name,
  subject,
  owner,
  users,
  isAnyCardSelected,
  isSelected,
  toggleSelect,
}: CardProps) {
  return (
    <div className="group w-full h-25 flex justify-between border cursor-pointer hover:bg-purple-200 mt-px">
      <div className="flex w-3/4">
        <div className="flex px-10 items-center">
          <div className="relative w-10 h-10">
            {/* Avatar */}
            <div
              className={`border rounded-full w-10 h-10 flex justify-center items-center 
              ${isAnyCardSelected ? "hidden" : "group-hover:hidden"}`}
            >
              {owner}
            </div>

            {/* Checkbox */}
            <div
              className={`absolute inset-0 flex justify-center items-center
              ${isAnyCardSelected ? "flex" : "hidden group-hover:flex"}`}
            >
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={isSelected} // ✅ agora controlado pelo App
                onChange={(e) => toggleSelect(id, e.target.checked)} // ✅ usa id
              />
            </div>
          </div>

          <div className="flex flex-col pl-6">
            <h1 className="font-bold">{name}</h1>
            <p>{subject}</p>
            <p>caixa de entrada</p>
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="flex items-center pr-10">
        <div className="flex flex-col items-center">
          <p>Hoje, 12:07</p>

          <div className="flex">
            {users.map((user, index) => (
              <div
                key={index}
                className="text-[12px] border rounded-full w-7 h-7 flex justify-center items-center"
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
