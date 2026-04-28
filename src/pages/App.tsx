import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import Card from "../components/Card";
import { FolderIcon, MailboxIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

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
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [accountData, setAccountData] = useState<MenuType[]>([]);
  const [emailData, setEmailData] = useState<EmailResponse[]>([]);
  const [currentSubmenuId, setCurrentSubmenuId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  function openAccount(id: number): void {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }

  function handleSubmenuClick(id: number) {
    setCurrentSubmenuId(id);
    setSelectedIds([]);
  }

  useEffect(() => {
    axios
      .get<
        MenuType[]
      >("https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/menus")
      .then((response) => setAccountData(response.data));

    axios
      .get<
        EmailResponse[]
      >("https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/items")
      .then((response) => setEmailData(response.data));
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row p-4 md:py-10 md:px-20">
      {/* painel A */}
      <section className="w-full md:w-3/12 border rounded-2xl md:rounded-l-2xl md:rounded-r-none p-4">
        <div className="w-full h-20 flex items-center border-b-2">
          <Menu>
            <MenuButton className="flex justify-center items-center cursor-pointer">
              <img
                src="https://avatars.githubusercontent.com/u/84355579?v=4"
                className="w-10 rounded-full"
              />
              <div className="font-semibold ml-2">Rafael Berger</div>
            </MenuButton>

            <MenuItems className="w-52 relative rounded-xl border p-1 text-purple-800 bg-purple-100 ">
              <MenuItem>
                <button className="w-full px-3 py-1.5 cursor-pointer hover:text-purple-300">
                  PERFIL
                </button>
              </MenuItem>
              <MenuItem>
                <Link to="/">
                  <button className="w-full px-3 py-1.5 cursor-pointer hover:text-purple-300">
                    SAIR
                  </button>
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>

        <div className="w-full">
          {accountData.map((data) => (
            <div key={data.id} className="p-3">
              <div className="flex items-center">
                <MailboxIcon color="#52057b" size={24} className="mr-2" />
                <button
                  className="text-purple-900 hover:text-purple-500 transition-colors cursor-pointer"
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
                      <div className="flex items-center text-sm cursor-pointer hover:text-gray-600">
                        <FolderIcon size={14} className="mr-1" />
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
      <section className="w-full md:w-9/12 border rounded-2xl md:rounded-r-2xl md:rounded-l-none mt-4 md:mt-0 pb-6">
        <div className="flex flex-col items-center pb-6 bg-purple-100 rounded-t-2xl ">
          <div className="w-full flex justify-center py-4 mt-8">
            <input
              placeholder="Pesquisar"
              className="border rounded-2xl w-11/12 md:w-8/12 h-10 pl-4 bg-white"
            />
          </div>

          <div className="flex flex-col justify-around items-center md:flex-row gap-2 w-11/12 md:w-3/6">
            <Button name="Atribuir" />
            <Button name="Arquivar" onClick={handleArchive} />
            <Button name="Agendar" />
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
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default App;
