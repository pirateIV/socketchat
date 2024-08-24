import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <main className="min-h-screen">
        <div className="grid lg:grid-cols-auto-1fr relative">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
