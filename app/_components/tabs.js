"use client";

import { useState } from "react";
import AddButton from "./addButton";
const Tabs = ({ active, purchases, products, customerId }) => {
  const [activeTab, setActiveTab] = useState(active);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const activeClassName = "border-red-300 text-primary dark:text-primary";

  return (
    <div>
      <ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0">
        <li>
          <button
            className={`${
              activeTab === "purchases"
                ? activeClassName
                : "text-neutral-500 dark:text-white/50 border-transparent"
            }my-2 block border-x-0 border-b-2 border-t-0  px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight  hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate dark:hover:bg-neutral-700/60`}
            onClick={() => handleTabChange("purchases")}
          >
            Purchases
          </button>
        </li>
        <li>
          <button
            onClick={() => handleTabChange("treatments")}
            className={`${
              activeTab === "treatments"
                ? activeClassName
                : "text-neutral-500 dark:text-white/50 border-transparent"
            }my-2 block border-x-0 border-b-2 border-t-0  px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight  hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate dark:hover:bg-neutral-700/60`}
          >
            Treatments
          </button>
        </li>
      </ul>

      <div className="mb-6">
        <div
          className={`opacity-100 transition-opacity duration-150 ease-linear ${
            activeTab === "purchases" ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center mt-3">
            <AddButton
              modal="purchase"
              products={products}
              customerId={customerId}
            />
          </div>
          <h2 className="mb-2">Purchased Products</h2>
          <ul>
            {purchases.map((purchase) => {
              return (
                <li key={purchase._id}>
                  {purchase.productId.productName} on{" "}
                  {new Date(purchase.purchaseDate).toLocaleDateString("en-UK")}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`${
            activeTab == "treatments" ? "block" : "hidden"
          } opacity-100 transition-opacity duration-150 ease-linear`}
        >
          Tab 2 content
        </div>
      </div>
    </div>
  );
};

export default Tabs;
