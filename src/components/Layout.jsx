import { Children, cloneElement, useState } from "react";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const childrenWithProps = Children.map(children, (child) =>
    cloneElement(child, { isOpen, setIsOpen }),
  );

  return (
    <div>
      <main className="min-h-screen">
        <div className="grid lg:grid-cols-auto-1fr relative">
          {childrenWithProps}
        </div>
      </main>
    </div>
  );
};

export default Layout;
