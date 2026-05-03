import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, useEffect } from "react";

import axios from "axios";

import Button from "../components/Button";
import Card from "../components/Card";

import { FolderIcon, MailboxIcon } from "@phosphor-icons/react";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { ENDPOINT_MENUS, ENDPOINT_ITEMS } from "../api/endpoints";

type SubMenu = {
  id: number;
  name: string;
};

type MenuType = {
  id: number;
  name: string;
  subMenus?: SubMenu[];
};

type EmailInfo = {
  id: string;
  name: string;
  subject: string;
  owner: string;
  users: string[];
};

type EmailResponse = {
  id: number;
  subMenuItems: EmailInfo[];
};

function App() {
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [accountData, setAccountData] = useState<MenuType[]>([]);
  const [emailData, setEmailData] = useState<EmailResponse[]>([]);
  const [currentSubmenuId, setCurrentSubmenuId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { t, i18n } = useTranslation();

  const [isDark, setIsDark] = useState(false);

  function toggleSelect(id: string, isChecked: boolean) {
    if (isChecked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  }

  function handleArchive() {
    setEmailData((prev) =>
      prev.map((group) => ({
        ...group,
        subMenuItems: group.subMenuItems.filter(
          (item) => !selectedIds.includes(item.id),
        ),
      })),
    );
    setSelectedIds([]);
  }

  const extraMenus = [
    { id: 100, name: "Caixa de entrada" },
    { id: 101, name: "Caixa de saída" },
    { id: 102, name: "Inbox" },
    { id: 103, name: "Vip" },
    { id: 104, name: "Lixo" },
  ];

  function handleLogOff() {
    localStorage.removeItem("isAuth");

    navigate("/");
  }

  function changeLanguageAndSave(lang: string) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  function openAccount(id: number): void {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }

  function handleSubmenuClick(id: number) {
    setCurrentSubmenuId(id);
    setSelectedIds([]);
  }

  useEffect(() => {
    axios
      .get<MenuType[]>(ENDPOINT_MENUS)
      .then((response) => setAccountData(response.data));

    axios
      .get<EmailResponse[]>(ENDPOINT_ITEMS)
      .then((response) => setEmailData(response.data));
  }, []);

  return (
    <div
      className={` ${isDark ? "w-full min-h-screen justify-center flex flex-col md:flex-row p-4 md:py-10 md:px-20 bg-gray-800  text-black " : "w-full min-h-screen justify-center flex flex-col md:flex-row p-4 md:py-10 md:px-20 bg-white  text-black"}`}
    >
      {/* painel A */}

      <section
        className={`w-full ${isDark ? "dark:bg-orange-500" : ""} resize-x overflow-hidden min-w-82 md:w-3/12 border rounded-2xl md:rounded-l-2xl md:rounded-r-none p-4`}
      >
        <button
          className="w-12 border cursor-pointer hover:bg-gray-400"
          onClick={() => changeLanguageAndSave("pt")}
        >
          🇧🇷
        </button>
        <button
          className="w-12 border cursor-pointer hover:bg-gray-400"
          onClick={() => changeLanguageAndSave("en")}
        >
          🇺🇸
        </button>
        <div className="w-full h-30 flex items-center border-b-2 justify-around">
          <Menu>
            <MenuButton className="flex justify-center items-center cursor-pointer">
              <img
                src="https://avatars.githubusercontent.com/u/84355579?v=4"
                className="w-10 rounded-full"
              />
              <div
                className={` ${isDark ? "font-semibold ml-2 dark:text-white" : "font-semibold ml-2"} `}
              >
                Admin
              </div>
            </MenuButton>

            <MenuItems className="w-52 absolute rounded-xl border p-1 text-orange-800 bg-orange-100 ">
              <MenuItem>
                <button
                  onClick={handleLogOff}
                  className="w-full px-3 py-1.5 cursor-pointer hover:text-orange-300"
                >
                  {t("logout")}
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
          <div className="pl-4 flex flex-col h-full justify-around">
            <div onClick={() => setIsDark(true)}>
              <Button isDark={isDark} name={t("dark")} />
            </div>
            <div onClick={() => setIsDark(false)}>
              <Button isDark={isDark} name={t("light")} />
            </div>
          </div>
        </div>

        <div className="w-full">
          {accountData.map((data) => (
            <div key={data.id} className="p-3">
              <div className="flex items-center">
                <MailboxIcon color="#FFC078" size={24} className="mr-2" />
                <button
                  className={` ${isDark ? "text-orange-900 hover:text-orange-200 transition-colors cursor-pointer dark:text-orange-50" : "text-orange-900 hover:text-orange-500 transition-colors cursor-pointer"} `}
                  onClick={() => openAccount(data.id)}
                >
                  {data.name}
                </button>
              </div>

              {openMenuId === data.id &&
                [
                  ...(data.subMenus || []),
                  ...extraMenus.filter(
                    (extra) =>
                      !(data.subMenus || []).some(
                        (sub) => sub.name === extra.name,
                      ),
                  ),
                ].map((sub) => (
                  <div key={sub.id} className="pl-4">
                    <button onClick={() => handleSubmenuClick(sub.id)}>
                      <div
                        className={`${isDark ? "flex items-center text-sm cursor-pointer hover:text-gray-600 dark:text-orange-50 dark:hover:text-orange-200" : "flex items-center text-sm cursor-pointer hover:text-gray-600"} `}
                      >
                        <FolderIcon
                          color="#FFC078"
                          size={14}
                          className="mr-1"
                        />
                        {sub.name} (
                        {emailData.find((i) => i.id === sub.id)?.subMenuItems
                          .length || 0}
                        )
                      </div>
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </section>

      {/* painel B */}
      <section
        className={`w-full ${isDark ? "dark:bg-orange-400" : ""} md:w-9/12 border rounded-2xl md:rounded-r-2xl md:rounded-l-none mt-4 md:mt-0 pb-6 `}
      >
        <div
          className={`${isDark ? "flex flex-col items-center pb-6 bg-orange-400 rounded-tr-2xl dark:bg-orange-400" : "flex flex-col items-center pb-6 bg-orange-500 rounded-tr-2xl"} `}
        >
          <div className="w-full flex justify-center py-4 mt-8">
            <input
              placeholder={t("search")}
              className="border rounded-2xl w-11/12 md:w-8/12 h-10 pl-4 bg-white"
            />
          </div>

          <div className="flex flex-col justify-around items-center md:flex-row gap-2 w-11/12 md:w-3/6">
            <Button isDark={isDark} name={t("assign")} />
            <Button
              isDark={isDark}
              name={t("archive")}
              onClick={handleArchive}
            />
            <Button isDark={isDark} name={t("schedule")} />
          </div>
        </div>

        <div>
          {emailData
            .filter((group) => group.id === currentSubmenuId)
            .flatMap((group) => group.subMenuItems)
            .map((item) => (
              <Card
                key={item.id}
                id={item.id}
                owner={item.owner}
                name={item.name}
                subject={item.subject}
                users={item.users}
                isAnyCardSelected={selectedIds.length > 0}
                isSelected={selectedIds.includes(item.id)}
                toggleSelect={toggleSelect}
                isDark={isDark}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default App;
