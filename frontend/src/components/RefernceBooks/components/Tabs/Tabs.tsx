import clsx from "clsx";
import { References } from "../../types";
import { reference } from "./static";
import { useRouter } from "next/router";
import { useReferenceTabsStore } from "../../../../../shared/stores/referenceTabs";

export const Tabs: React.FC = () => {
  const { currentTab, setTab } = useReferenceTabsStore();
  const { locale = "ru" } = useRouter();
  const handleMenuClick = (tab: References) => {
    setTab(tab);
  };
  return (
    <>
      <div className="flex">
        <ul className="flex gap-4 flex-wrap ">
          {reference.map((item) => (
            <li
              className={clsx(
                {
                  "border-b-4 border-red": currentTab === item.categoryName,
                },
                "cursor-pointer text-[18px] px-[15px] py-[10px] font-bold text-primary"
              )}
              onClick={() => handleMenuClick(item.categoryName)}
              key={item.categoryName}
            >
              {item.value[locale]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
