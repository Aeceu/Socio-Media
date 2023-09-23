import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function LoginInfo() {
  return (
    <div className="w-[45%] md:flex hidden flex-col ">
      <h1 className={`text-cursive text-8xl text-emerald-500`}>Socio Media</h1>
      <p className="text-lg ">
        Unlock a World of Interactions - Welcome to Social Media: Your Gateway
        to Global Networking.
      </p>
      <h1 className="text-lg mt-4 hover:underline hover:text-emerald-600 cursor-pointer">
        Support my socials:
      </h1>
      <div className="flex gap-2 py-2">
        <Link
          to="https://github.com/kaneki081"
          className="hover:text-emerald-500 "
        >
          <FaGithub size="1.5rem" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/jose-acebuche-4a5b851b5/"
          className="hover:text-emerald-500 "
        >
          <FaLinkedin size="1.5rem" />
        </Link>
        <Link
          to="https://www.facebook.com/Aeceuuu"
          className="hover:text-emerald-500 "
        >
          <FaFacebook size="1.5rem" />
        </Link>
      </div>
    </div>
  );
}
