import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-medium text-white"
      >
        <a
          href="#"
          className="flex items-center hover:text-yellow-500 transition-colors"
        >
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-medium text-white"
      >
        <a
          href="#tech"
          className="flex items-center hover:text-yellow-500 transition-colors"
        >
          Tech
        </a>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-medium text-white"
      >
        <a
          href="#competitions"
          className="flex items-center hover:text-yellow-500 transition-colors"
        >
          Competitions
        </a>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-medium text-white"
      >
        <a
          href="#projects"
          className="flex items-center hover:text-yellow-500 transition-colors"
        >
          Projects
        </a>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="p-1 font-medium text-white"
      >
        <a
          href="#blogs"
          className="flex items-center hover:text-yellow-500 transition-colors"
        >
          Blogs
        </a>
      </Typography>
    </ul>
  );
}

const NavbarDesktop = () => {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <>
      <Navbar className="fixed top-0 z-10 bg-black border-none h-max max-w-full rounded-none px-10 py-3 md:px-24">
        <div className="flex items-center justify-between text-white">
          <Link to="signin">
            <Typography
              as="a"
              variant="h4"
              className="mr-4 cursor-pointer py-1.5 "
            >
              Portfolio
            </Typography>
          </Link>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavbarDesktop;
