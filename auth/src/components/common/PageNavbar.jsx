import {
    Dropdown,
    Image,
    Nav,
    Navbar,
    Container,
    NavDropdown,
} from "react-bootstrap";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserAvatar } from "../../utils/user-avatar";
import { useAuth } from "../../context/AuthContext";

function PageNavbar() {

    const { user, logout } = useAuth();
    const navLinks = [
        { title: "Protected Path", path: "#" },
    ];
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <a href="#" passHref>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top mx-2 rounded-circle infinite-rotate"
                        />
                        Firebase
                    </Navbar.Brand>
                </a>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {user &&
                            navLinks.map((item, i) => (
                                <a href={item.path} key={i} passHref>
                                    <span>{item.title}</span>
                                </a>
                            ))}
                    </Nav>
                    <Nav>
                        {user && (
                            <NavDropdown
                                title={
                                    <div className="media d-flex">
                                        <Image
                                            src={getUserAvatar(user?.name, 30)}
                                            className="user-avatar rounded-circle"
                                        />
                                        <div style={{ width: "5px" }}></div>
                                        <div className="media-body align-items-center">
                                            <span className="my-0 font-small fw-semibold">
                                                {user?.name ?? "Unknown"}
                                            </span>
                                        </div>
                                    </div>
                                }
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item className="fw-semibold" onClick={logout}>
                                    <FontAwesomeIcon
                                        icon={faSignOutAlt}
                                        className="text-danger me-2"
                                        style={{ width: "20px" }}
                                    />{" "}
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>


                        )}
                        {!user && (
                            <a href="/signin" passHref>
                                <span>Login/Sign-Up</span>
                            </a>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default PageNavbar;