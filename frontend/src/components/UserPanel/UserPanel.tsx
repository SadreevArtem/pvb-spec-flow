import clsx from "clsx";
import { menuUser, menuUserNotAccess } from "./static";
import { Button } from "../Button/Button";
import { useAuthStore } from "../../../shared/stores/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import Image from "next/image";
import { ReferenceBooks } from "../RefernceBooks/ReferenceBooks";
import { useMenuStore } from "../../../shared/stores/menu";
import LocaleSwitcher from "../Login/LocaleSwitcher/LocaleSwitcher";
import { Orders } from "../Orders/Orders";
import { useJwtToken } from "../../../shared/hooks/useJwtToken";
import dayjs from "dayjs";

type Props = {
  title: string;
  className?: string;
};

export const UserPanel: React.FC<Props> = ({ title, className = "" }) => {
  const { currentMenu, setCurrentMenu } = useMenuStore();
  const { endContract } = useJwtToken();
  console.log(endContract);

  const isAccess = Boolean(endContract) && dayjs().isBefore(endContract);
  const unAuth = useAuthStore((state) => state.unAuth);
  const { locale = "ru" } = useRouter();
  const t = useTranslations("AdminPanel");
  const renderContent = () => {
    switch (currentMenu) {
      case "reference":
        return <ReferenceBooks />;
      case "orders":
        return <Orders />;
      case "account":
        return <>Account</>;
      default:
        return null; // Возвращает null, если нет совпадений
    }
  };
  const handleMenuClick = (menu: string) => {
    setCurrentMenu(menu); // сохраняем текущее меню в Zustand и localStorage
  };
  return (
    <>
      <div className="container mt-8 flex flex-col">
        <LocaleSwitcher className="ml-auto mr-6 mb-8" />
        <div className="flex justify-between items-center">
          <div className="flex items-end">
            <Image
              src="/logo-max.png"
              alt="logo"
              width={100}
              height={100}
              className="self-center"
            />
            <h1
              className={clsx(
                "text-primary font-semibold text-[24px]",
                className
              )}
            >
              {title}
            </h1>
          </div>
          <Button onButtonClick={unAuth} title={t("signOut")}></Button>
        </div>
        <div className="flex gap-4 mt-6">
          <div className="">
            <ul className="flex flex-col mt-12">
              {isAccess
                ? menuUser.map((item) => (
                    <li
                      onClick={() => handleMenuClick(item.name)}
                      className={clsx(
                        {
                          "!bg-primary text-white": currentMenu === item.name,
                        },
                        "cursor-pointer text-[18px] px-[15px] py-[10px] font-bold bg-tab md:min-w-[260px] md:min-h-[47px] mb-[2px] rounded-[0.25rem] w-full"
                      )}
                      key={item.id}
                    >
                      <button>{item.value[locale]}</button>
                    </li>
                  ))
                : menuUserNotAccess.map((item) => (
                    <li
                      onClick={() => handleMenuClick(item.name)}
                      className={clsx(
                        {
                          "!bg-primary text-white": currentMenu === item.name,
                        },
                        "cursor-pointer text-[18px] px-[15px] py-[10px] font-bold bg-tab md:min-w-[260px] md:min-h-[47px] mb-[2px] rounded-[0.25rem] w-full"
                      )}
                      key={item.id}
                    >
                      <button>{item.value[locale]}</button>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="w-full">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};
