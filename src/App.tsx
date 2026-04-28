import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./components/Button";
import Card from "./components/Card";

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
      .then((response) => {
        setAccountData(response.data);
      });

    axios
      .get<
        EmailResponse[]
      >("https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/items")
      .then((response) => {
        setEmailData(response.data);
      });
  }, []);

  return (
    <div className="w-full h-screen flex py-10 px-80">
      {/* painel A */}
      <section className="resize-x overflow-hidden p-4 w-3/12 min-w-2xs border rounded-l-2xl">
        <div className="w-full h-30 flex items-center border-b-2">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline cursor-pointer ">
              <div className="text-black border rounded-full w-10 h-10 flex justify-center items-center">
                OA
              </div>
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl border  p-1 text-sm/6 text-white bg-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                  PERFIL
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                  SAIR
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
          <div className="font-semibold">Rafael Berger</div>
        </div>

        <div className="w-full h-full">
          {accountData.map((data) => (
            <div key={data.id} className="p-3">
              <button onClick={() => openAccount(data.id)}>
                - {data.name}
              </button>

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
                      {sub.name} (
                      {emailData.find((item) => item.id === sub.id)
                        ?.subMenuItems.length || 0}
                      )
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </section>

      {/* painel B */}
      <section className="w-9/12 border rounded-r-2xl px-1">
        <div className="flex flex-col items-center pb-8">
          <div className="w-full h-40 flex justify-center items-center">
            <input className="border rounded-2xl w-8/12 h-10 pl-4" />
          </div>

          <div className="flex justify-around w-3/6">
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
