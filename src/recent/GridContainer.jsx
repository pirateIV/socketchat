import React from "react";
import SocketLogo from "../components/SocketLogo";

const GridContainer = ({ users, selectedUser, children }) => {
  // Iterate over the children and clone each one, passing the selectedUser prop
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { users, selectedUser }),
  );

  return (
    <>
      {selectedUser ? (
        <div className="bg-cover bg-chat-bg">
          <div className="flex flex-col h-full justify-between">
            {childrenWithProps}
          </div>
        </div>
      ) : (
        <SocketLogo />
      )}
    </>
  );
};

export default GridContainer;
