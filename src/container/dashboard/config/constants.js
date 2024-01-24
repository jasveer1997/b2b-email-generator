import React from "react";
import {AppstoreOutlined, TrademarkOutlined} from "@ant-design/icons";

export const SIDEBAR_ITEMS = [
    {
        key: String(1),
        disabled: true,
        icon: React.createElement(TrademarkOutlined),
        label: `Babbel TM`,
    },
    {
        key: String(2),
        icon: React.createElement(AppstoreOutlined),
        label: `All Users`,
    }
];

export const MAX_DESC_LEN = 100;