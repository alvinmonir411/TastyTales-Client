import React from "react";

const SocailLogin = () => {
  return (
    <button
      onClick={googlelogin}
      className="btn bg-white text-black border-[#e5e5e5]"
    >
      <BsGoogle className="text-accent" />
      Login with Google
    </button>
  );
};

export default SocailLogin;
