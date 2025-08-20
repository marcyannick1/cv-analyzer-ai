"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMoreVertical } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { dashboardItems } from "@/app/data/dashboard";
import { useDashboards } from "@/app/hooks/useDashboards";
import Drawer from "../../shared/Drawer";
import Accordion from "../../shared/Accordion";
import DashboardItem from "./DashboardItem";
import SkeletonIcon from "../../Skeleton/SkeletonIcon";
import Empty from "../../shared/Empty";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  const { datas, loading, error } = useDashboards(true);

  const toggleDrawer = (name = "", path = "", items = []) => {
    setCurrentTitle(name);
    setCurrentPath(path);
    setCurrentItems(items);
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <SkeletonIcon />;
  }

  if (error) {
    return (
      <Empty
        title="Aucune donnée trouvée"
        message="Aucun résultat correspondant n'a été identifié pour le moment."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {datas.map(({ name, path, items }, index) => (
          <div key={index}>
            <div className="rounded-sm border border-gray-200 bg-white">
              <div className="flex justify-end pt-1 px-1">
                <button
                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                  onClick={() => toggleDrawer(name, path, items)}
                >
                  <FiMoreVertical className="md:text-lg text-sm text-gray-800" />
                </button>
              </div>

              <div className="flex flex-col justify-center items-center pb-4">
                <div className="flex justify-center">
                  <Link
                    href={path}
                    className="p-2 bg-green-100 rounded-md border border-gray-300"
                  >
                    {dashboardItems.map(({ defaultPath, icon }, iconIndex) => (
                      <span key={iconIndex}>
                        {path === defaultPath && icon}
                      </span>
                    ))}
                  </Link>
                </div>

                <div>
                  <Link href={path}>
                    <h3 className="font-medium hover:underline hover:transition hover:duration-300 text-gray-800 rounded-sm p-3">
                      {name}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isOpen && currentTitle === name && (
                <Drawer
                  isOpen={isOpen}
                  toggleDrawer={toggleDrawer}
                  title={currentTitle}
                  path={currentPath}
                  components={[
                    <Accordion
                      title={`Ajoutés récemment (${currentItems.length})`}
                      component={
                        <DashboardItem
                          items={currentItems}
                          path={currentPath}
                        />
                      }
                      active
                      key="accordion"
                    />,
                  ]}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
}
