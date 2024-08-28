import { Children, cloneElement, useState } from "react";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const childrenWithProps = Children.map(children, (child) =>
    cloneElement(child, { isOpen, setIsOpen }),
  );

  return (
    <main>
      <div className="grid lg:grid-cols-auto-1fr relative">
        {childrenWithProps}
      </div>
    </main>
  );
};

export default Layout;
