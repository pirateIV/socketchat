const Username = ({ self, username }) => {
  return (
    <div className="user-name text-white">
      {username}&nbsp;
      <strong className="!text-sm font-gentium text-gray-200">
        {self ? "(Yourself)" : ""}
      </strong>
    </div>
  );
};

export default Username;
