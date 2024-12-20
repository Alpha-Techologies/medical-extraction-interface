import React from "react";
import { Icon } from "@iconify/react";
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { Upload } from "lucide-react";
import { useGetUserQuery, useLogoutMutation } from "@/redux/features/user";

const Header = () => {
  // const { data, isLoading } = useGetUserQuery("");
  const [logout] = useLogoutMutation();
  const ProfieItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href='/profile'>Setting</Link>,
      icon: <Icon icon='tdesign:user-setting' />,
    },
    {
      key: "2",
      label: (
        <Link
          href='/home'
          onClick={() => logout("")}>
          Logout
        </Link>
      ),
      icon: <Icon icon='solar:logout-2-outline' />,
      danger: true,
    },
  ];

  const { data: user } = useGetUserQuery("");
  // console.log(user);

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-xl font-semibold ml-2'>
            {user?.organization}
          </span>
        </div>
        <div className='flex gap-2'>
          <span className='text-base font-semibold '>{user?.first_name}</span>
          <Dropdown
            menu={{ items: ProfieItems }}
            trigger={["click"]}>
            <a
              onClick={(e) => e.preventDefault()}
              className='flex gap-0'>
              <Avatar
                size='default'
                icon={<UserOutlined />}
              />
              <Icon
                icon='gridicons:dropdown'
                width='1.5rem'
                height='1.5rem'
                className='pt-1'
              />
            </a>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
