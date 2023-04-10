import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons/lib";
import { FaBeer } from "react-icons/fa";
import { IconContext } from "react-icons";
interface Item {
  Icon: IconType;
  label: React.ReactNode;
  onClick?: () => any;
}
type DropdownProps = {
  className?: string;
  openClass?: string;
  items: Item[];
};

const Dropdown: FCC<DropdownProps> = ({
  children,
  className,
  openClass,
  items,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className={`${className}${open ? ` ${openClass}` : ""}`}>
            {children}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 ">
                {items.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <MenuItemButon
                        active={active}
                        Icon={item.Icon}
                        label={item.label}
                      />
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

interface MenuItemButtonProps extends Item {
  active?: boolean;
}

const MenuItemButon: React.FC<MenuItemButtonProps> = ({
  label,
  onClick,
  Icon,
  active = "false",
}) => {
  return (
    <button
      className={`${
        active ? "bg-gray-100" : ""
      } group flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100`}
    >
      <Icon size="1.2rem" className="mr-2.5 text-blue-700" />
      {label}
    </button>
  );
};

export default Dropdown;
