import { useState } from "react";
import User from "@/components/users/User";
import SearchIcon from "@/components/icons/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setSelectedUser, setUsers } from "@/redux/usersSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, selectedUser } = useAppSelector(({ user }) => user);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectUser = (user) => {
    dispatch(setSelectedUser(user));
    console.log(selectedUser);
  };

  return (
    <>
      <section className="space-y-3">
        <h1 className="m-5 text-lg font-semibold">Users</h1>

        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            placeholder="Search or start a new chat"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="peer block w-[93%] h-10 ms-3 ps-9 border-t-white !rounded-sm text-xs p-2.5 text-white outline-none !cursor-text !shadow-none transition duration-300 !bg-blue-400/50 placeholder:text-gray-200 focus:border-0 focus:ring focus:ring-gray-100 focus:ring-opacity-50 focus:!bg-transparent"
          />
          <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-6 text-blue-200 pointer-events-none peer-focus:text-white">
            <SearchIcon /> <span className="sr-only">Search icon</span>
          </div>
        </div>

        <hr className="opacity-30" />

        <div className="h-[calc(100dvh-195px)] min-h-max ms-3 pb-3 space-y-1 overflow-y-auto">
          {users.length > 0 ? (
            users.map((user) => (
              <User
                user={user}
                key={user.userID}
                selected={selectedUser?.userID === user.userID}
                onSelect={() => handleSelectUser(user)}
              />
            ))
          ) : (
            <div
              animate-spin=""
              i-carbon:circle-dash=""
              className="mx-auto text-3xl"
            ></div>
          )}
        </div>
      </section>
    </>
  );
};

export default Users;
