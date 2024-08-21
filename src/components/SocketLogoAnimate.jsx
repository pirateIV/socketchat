const SocketLogoAnimate = ({ isValid }) => {
  return (
    <div
      icon-socket-logo=""
      className={`text-5xl mb-6 transition-all ${!isValid ? "animate-bounce" : "animate-pulse"}`}
    ></div>
  );
};

export default SocketLogoAnimate;
