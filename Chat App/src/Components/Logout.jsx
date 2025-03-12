import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const LogOut = () => {
  const logout = () => {
    signOut(auth);
  };

  return (
    <button className="btn-login btn-logout" onClick={logout}>
      <i className="fa-brands fa-google"></i>
      Log out
    </button>
  );
};

export default LogOut;
