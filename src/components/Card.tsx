import { useTranslation } from "react-i18next";

interface CardProps {
  id: string;
  name: string;
  subject: string;
  owner: string;
  users: string[];
  isDark: boolean;
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
  isDark,
  isSelected,
  toggleSelect,
}: CardProps) {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => toggleSelect(id, !isSelected)}
      className={`${
        isSelected ? "bg-orange-300" : "hover:bg-orange-300"
      } group w-full min-h-20 flex justify-between border cursor-pointer mt-px`}
    >
      <div className={`flex w-3/4 ${isDark ? "text-orange-100" : ""}`}>
        <div className="flex px-4 md:px-10 items-center">
          <div className="relative w-10 h-10">
            <div
              className={`border rounded-full w-10 h-10 flex justify-center items-center text-orange-600
              ${isAnyCardSelected ? "hidden" : "group-hover:hidden"} ${isDark ? "border-orange-100" : ""}`}
            >
              <div className={`${isDark ? "text-orange-100 " : ""}`}>
                {owner}
              </div>
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
          <p className={`${isDark ? "text-orange-100" : ""}`}>
            {" "}
            {`${t("today")}, 12:07`}
          </p>

          <div className="flex flex-wrap max-w-25 md:max-w-none">
            {users.map((user, index) => (
              <div
                key={index}
                className={` ${isDark ? "border text-orange-200 rounded-full w-6 h-6 md:w-7 md:h-7 flex justify-center items-center text-[10px] md:text-[12px]" : "border text-orange-600 rounded-full w-6 h-6 md:w-7 md:h-7 flex justify-center items-center text-[10px] md:text-[12px]"} `}
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
