import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <main className="min-h-screen">
        <div className="grid grid-cols-auto-1fr">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
