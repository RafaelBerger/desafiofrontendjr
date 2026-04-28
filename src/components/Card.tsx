import { useState } from "react";

interface CardProps {
  name: string;
  subject: string;
  owner: string;
  users: string[];
  isAnyCardSelected: boolean;
  triggerCardsCheckbox: (checked: boolean) => void;
}

export default function Card({
  name,
  subject,
  owner,
  users,
  isAnyCardSelected,
  triggerCardsCheckbox,
}: CardProps) {
  const [colorChange, setColorChange] = useState(false);

  function handleColorChange() {
    setColorChange(!colorChange);
  }

  return (
    <div className="group w-full h-25 flex justify-between border cursor-pointer hover:bg-gray-200 mt-px">
      <div className="flex w-3/4">
        <div className="flex px-10 justify-center items-center">
          <div className="relative w-10 h-10">
            <div
              className={`border rounded-full text-black w-10 h-10 flex justify-center items-center 
    ${isAnyCardSelected ? "hidden" : "group-hover:hidden"}`}
            >
              {owner}
            </div>

            <div
              className={`absolute inset-0 justify-center items-center
    ${isAnyCardSelected ? "flex" : "hidden group-hover:flex"}`}
            >
              <input
                type="checkbox"
                className="w-5 h-5"
                onChange={(e) => triggerCardsCheckbox(e.target.checked)}
                onClick={handleColorChange}
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

      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center pr-10">
          <div>
            <p>Hoje, 12:07</p>
          </div>
          <div className="flex">
            <div className="flex">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="text-black text-[12px] border rounded-full w-7 h-7 flex justify-center items-center"
                >
                  {user}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
