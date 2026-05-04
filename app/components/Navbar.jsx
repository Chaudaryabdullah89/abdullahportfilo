import Link from "next/link";
import logo from "../../public/logo_copy-removebg-preview.png";

const Navbar = () => {
  return (
    <nav className="w-full h-30 text-white flex gap-40 pt-10 items-center justify-around px-10">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo.src} alt="logo" className="h-14 w-auto object-contain" />
      </div>

      {/* Links */}
      <ul className="flex gap-14 pr-0 text-sm font-semibold uppercase tracking-wider">
        <li className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:text-gray-400">
          <Link href="/">Home</Link>
        </li>
        <li className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:text-gray-400">
          <Link href="/about">About</Link>
        </li>
        <li className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:text-gray-400">
          <Link href="/projects">Projects</Link>
        </li>
        <li className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:text-black-400 text-black relative bottom-2 bg-white cursor-pointer px-4 py-2 rounded-full">
          <Link className="mb-10" href="/contact">
            Contact Me
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
