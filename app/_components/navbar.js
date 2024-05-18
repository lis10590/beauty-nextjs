"use client";
// import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import styles from "../_styles/navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const NavbarComp = () => {
  const router = useRouter();
  const { data } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const links = [
    { href: "/home", label: "Home" },
    { href: "/myAccount", label: "My Account" },
    { href: "/clients", label: "Clients" },
    { href: "/products", label: "Products" },
    { href: "/treatments", label: "Treatments" },
    { href: "/analytics", label: "Analytics" },
  ];
  return (
    <nav className="flex items-center bg-gray-800 text-white p-4">
      {data?.user ? (
        <div className="flex">
          <div>
            <ul className="hidden md:flex space-x-4">
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <Link className="hover:text-gray-400" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <Link
            href="#"
            onClick={onLogout}
            className="md:ml-4 hover:text-gray-400"
          >
            Logout
          </Link>
        </div>
      ) : (
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-gray-400">
              Register
            </Link>
          </li>
        </ul>
      )}
      <div>
        <button
          id="menu-btn"
          className="md:hidden focus:outline-none pl-4"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden fixed top-10 left-0 h-full w-40 bg-gray-800 py-4 text-white z-50 overflow-auto transition duration-300 ease-in-out transform ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {data?.user ? (
          <div>
            <ul className="space-y-2 pl-4">
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <Link className="hover:text-gray-400" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="space-y-2 pl-4">
              <li>
                <Link
                  href="#"
                  onClick={onLogout}
                  className="hover:text-gray-400"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="space-y-2 pl-4">
            <li>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-gray-400">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavbarComp;

// const NavbarComp = () => {
//   const router = useRouter();
//   const { data } = useSession();

//   const onLogout = async () => {
//     await signOut({ callbackUrl: "/" });

//     router.push("/");
//   };
//   return (
//     <Navbar expand="lg" classNameName={styles.navbarDiv}>
//       <Container>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           {data?.user && (
//             <Nav classNameName="me-auto">
//               <Nav.Item>
//                 <Link classNameName={`${styles.navbarLink} me-3`} href="/home">
//                   Home
//                 </Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Link classNameName={`${styles.navbarLink} me-3`} href="/myAccount">
//                   {" "}
//                   My Account
//                 </Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Link classNameName={`${styles.navbarLink} me-3`} href="/clients">
//                   {" "}
//                   Clients
//                 </Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Link classNameName={`${styles.navbarLink} me-3`} href="/products">
//                   Products
//                 </Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Link
//                   classNameName={`${styles.navbarLink} me-3`}
//                   href="/treatments"
//                 >
//                   {" "}
//                   Treatments
//                 </Link>
//               </Nav.Item>
//               {/* <Nav.Item>
//                 <Link classNameName={`${styles.navbarLink} me-3`} href="/Analysis">
//                   {" "}
//                   Analytics
//                 </Link>
//               </Nav.Item> */}
//               <NavDropdown
//                 title="Analytics"
//                 // id="basic-nav-dropdown"
//                 classNameName={`${styles.navbarDrop}`}
//               >
//                 <NavDropdown.Item>
//                   <Link
//                     classNameName={`${styles.navbarLink} me-3`}
//                     href="/analysis/productsPurchases"
//                   >
//                     Revenue by Purchased Products
//                   </Link>
//                 </NavDropdown.Item>
//                 <NavDropdown.Item>
//                   <Link
//                     classNameName={`${styles.navbarLink} me-3`}
//                     href="/analysis/treatmentsPurchases"
//                   >
//                     Revenue by Treatments
//                   </Link>
//                 </NavDropdown.Item>
//                 <NavDropdown.Item>
//                   <Link
//                     classNameName={`${styles.navbarLink} me-3`}
//                     href="/analysis/monthlyRevenue"
//                   >
//                     Revenue by Month
//                   </Link>
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           )}
//           <Nav classNameName="ms-auto">
//             {data?.user ? (
//               <Nav.Item>
//                 <Link
//                   classNameName={`${styles.navbarLink} me-3`}
//                   href="/"
//                   onClick={onLogout}
//                 >
//                   Logout
//                 </Link>
//               </Nav.Item>
//             ) : (
//               <>
//                 <Nav.Item>
//                   <Link
//                     classNameName={`${styles.navbarLink} me-3`}
//                     href="/register"
//                   >
//                     Register
//                   </Link>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <Link classNameName={styles.navbarLink} href="/login">
//                     {" "}
//                     Login
//                   </Link>
//                 </Nav.Item>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavbarComp;
