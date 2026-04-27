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

function App() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [accountData, setAccountData] = useState<MenuType[]>([]);
  const [isAnyCardSelected, setIsAnyCardSelected] = useState(false);

  function openAccount(id: number): void {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }

  function triggerCardsCheckbox(isChecked: boolean) {
    setIsAnyCardSelected(isChecked);
  }
  useEffect(() => {
    axios
      .get<
        MenuType[]
      >("https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/menus")
      .then((response) => {
        setAccountData(response.data);
      });
  }, []);

  console.log(accountData[0]);

  return (
    <>
      <div className="w-full h-screen flex py-10 px-80">
        {/* painel A  */}

        <section className="resize-x overflow-hidden p-4 w-3/12 min-w-2xs border rounded-l-2xl">
          {/* componente 1  */}

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
          {/* componente 2  */}

          <div className="w-full h-full">
            {accountData.map((data) => (
              <div key={data.id} className="p-3">
                <button
                  className="cursor-pointer"
                  onClick={() => openAccount(data.id)}
                >
                  - {data.name}
                </button>

                {openMenuId === data.id &&
                  data.subMenus?.map((sub) => (
                    <div key={sub.id} className="pl-4 ">
                      <button className="cursor-pointer hover:bg-gray-200">
                        {sub.name}
                      </button>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* painel B */}
        </section>
        <section className="w-9/12 border-r border-b border-t rounded-r-2xl px-1">
          {/* elemento 3 */}

          <div className="flex flex-col w-full justify-center items-center  pb-8">
            <div className="w-full  h-40 flex justify-center items-center">
              <input
                type="text"
                className="border rounded-2xl w-8/12 h-10 pl-4"
              />
            </div>
            <div className="flex justify-around w-3/6">
              <Button name="Atribuir" />
              <Button name="Arquivar" />
              <Button name="Agendar" />
            </div>
          </div>

          {/* elemento 4*/}
          <div>
            <Card
              owner="OA"
              name="Rafael"
              subject="Boa tarde"
              isAnyCardSelected={isAnyCardSelected}
              triggerCardsCheckbox={triggerCardsCheckbox}
            />
            <Card
              owner="OA"
              name="Rafael"
              subject="Boa tarde"
              isAnyCardSelected={isAnyCardSelected}
              triggerCardsCheckbox={triggerCardsCheckbox}
            />
            <Card
              owner="OA"
              name="Rafael"
              subject="Boa tarde"
              isAnyCardSelected={isAnyCardSelected}
              triggerCardsCheckbox={triggerCardsCheckbox}
            />
            <Card
              owner="OA"
              name="Rafael"
              subject="Boa tarde"
              isAnyCardSelected={isAnyCardSelected}
              triggerCardsCheckbox={triggerCardsCheckbox}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
