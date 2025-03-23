import React, { useState, useEffect, useRef, memo } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { gsap } from "gsap";

const Logo: React.FC = memo(() => (
  <a
    href="/"
    className="flex justify-center items-center text-lg font-semibold tracking-widest text-neutral-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
  >
    <FaMapMarkerAlt />
    <span className=" text-neutral-900 font-semibold">
      <span className="font-bold">:</span>MP<span className="font-bold">.</span>
    </span>
  </a>
));

const MenuButton: React.FC<{ open: boolean; toggleOpen: () => void }> = memo(
  ({ open, toggleOpen }) => (
    <button
      className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
      onClick={toggleOpen}
    >
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
        {open ? (
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        ) : (
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        )}
      </svg>
    </button>
  )
);

const NavLinks: React.FC<{ open: boolean }> = memo(({ open }) => {
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/map", label: "Mapa" },
    {
      href: "https://github.com/CastDev-j/maps-app",
      label: "Repositorio",
      external: true,
    },
  ];

  return (
    <nav
      className={`flex-col flex-grow ${
        open ? "flex" : "hidden"
      } pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
    >
      {links.map((link, index) => (
        <a
          key={index}
          className={`text-center px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-neutral-900 focus:text-neutral-900 hover:bg-neutral-100 focus:bg-neutral-200 focus:outline-none focus:shadow-outline ${
            open ? "text-neutral-900 font-bold" : ""
          }`}
          href={link.href}
          target={link.external ? "_blank" : "_self"}
          rel={link.external ? "noopener noreferrer" : ""}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
});

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleOpen = () => {
    setOpen((prevOpen) => {
      const isOpening = !prevOpen;

      if (isOpening) {
        // Animación de despliegue
        gsap.fromTo(
          navRef.current,
          { height: 0, opacity: 0, display: "none" },
          {
            height: "auto",
            opacity: 1,
            display: "flex",
            duration: 0.5,
            ease: "power3.out",
          }
        );
      } else {
        // Animación de repliegue
        gsap.to(navRef.current, {
          height: 0,
          opacity: 0,
          display: "none",
          duration: 0.3,
          ease: "power1.in",
        });
      }

      return isOpening;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    // Ejecutar handleResize al montar para aplicar el estado inicial correctamente
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (open) {
      gsap.set(navRef.current, { height: "auto", opacity: 1, display: "flex" });
    } else {
      gsap.set(navRef.current, { height: 0, opacity: 0, display: "none" });
    }
  }, [open]);

  return (
    <div
      id="header"
      className="min-h-fit bg-neutral-100 animate-fade animate-duration-200 animate-ease-in"
    >
      <div className="antialiased bg-neutral-100">
        <div className="w-full text-neutral-700 bg-white">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <Logo />
              <MenuButton open={open} toggleOpen={toggleOpen} />
            </div>
            <nav ref={navRef}>
              <NavLinks open={open} />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
