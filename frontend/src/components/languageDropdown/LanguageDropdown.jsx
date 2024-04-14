import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // "1" corresponds to English

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    } else {
      setSelectedKey(e.key);
      setOpen(false);
      // You can add logic here to handle language change
    }
  };

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const items = [
    {
      label: "English",
      key: "1",
    },
    {
      label: "French",
      key: "2",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
      defaultSelectedKeys={[selectedKey]} // Set the default selected key
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {items.find((item) => item.key === selectedKey)?.label || "Language"}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default LanguageDropdown;
