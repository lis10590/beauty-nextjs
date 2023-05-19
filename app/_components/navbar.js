"use client";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import styles from "../_styles/navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NavbarComp = () => {
  const router = useRouter();
  const { data } = useSession();

  const onLogout = async () => {
    await signOut({ callbackUrl: "/" });
    // await getSession();
    // dispatch(logout());
    // dispatch(reset());
    router.push("/");
  };
  return (
    <Navbar expand="lg" className={styles.navbarDiv}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {data?.user && (
            <Nav className="me-auto">
              <Nav.Item>
                <Link className={`${styles.navbarLink} me-3`} href="/Home">
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className={`${styles.navbarLink} me-3`} href="/MyAccount">
                  {" "}
                  My Account
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className={`${styles.navbarLink} me-3`} href="/Clients">
                  {" "}
                  Clients
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className={`${styles.navbarLink} me-3`} href="/Products">
                  Products
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  className={`${styles.navbarLink} me-3`}
                  href="/Treatments"
                >
                  {" "}
                  Treatments
                </Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Link className={`${styles.navbarLink} me-3`} href="/Analysis">
                  {" "}
                  Analytics
                </Link>
              </Nav.Item> */}
              <NavDropdown
                title="Analytics"
                // id="basic-nav-dropdown"
                className={`${styles.navbarDrop}`}
              >
                <NavDropdown.Item>
                  <Link
                    className={`${styles.navbarLink} me-3`}
                    href="/Analysis/ProductsPurchases"
                  >
                    Revenue by Purchased Products
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    className={`${styles.navbarLink} me-3`}
                    href="/Analysis/TreatmentsPurchases"
                  >
                    Revenue by Treatments
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    className={`${styles.navbarLink} me-3`}
                    href="/Analysis/MonthlyRevenue"
                  >
                    Revenue by Month
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          <Nav className="ms-auto">
            {data?.user ? (
              <Nav.Item>
                <Link
                  className={`${styles.navbarLink} me-3`}
                  href="/"
                  onClick={onLogout}
                >
                  Logout
                </Link>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Link
                    className={`${styles.navbarLink} me-3`}
                    href="/Register"
                  >
                    Register
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className={styles.navbarLink} href="/Login">
                    {" "}
                    Login
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
