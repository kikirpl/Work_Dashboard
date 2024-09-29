// components/Layout.js
"use client";

import React from "react";

import "./globals.css";
const Layout = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
