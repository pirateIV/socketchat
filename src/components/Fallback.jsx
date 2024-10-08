import { useAppSelector } from "@/app/hooks";

const Fallback = ({ isOpen, setIsOpen }) => {
  const { selectedUser } = useAppSelector(({ user }) => user);

  const handleFallback = () => {
    if (selectedUser) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen ? (
        <div
          id="fallback"
          className="absolute inset-0 bg-black bg-opacity-40 transition duration-1000"
          onClick={handleFallback}
        >
          <div className="absolute top-5 right-5">
            {/* <UserAvatar username={selectedUser?.username} /> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Fallback;
