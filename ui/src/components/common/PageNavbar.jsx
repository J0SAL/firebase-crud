import {
    Dropdown,
    Image,
    Nav,
    Navbar,
    Container,
    NavDropdown,
    NavLink,
    NavItem,
} from "react-bootstrap";
import { faAngleDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserAvatar } from "../../utils/user-avatar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { PAGE_TITLE } from "../../utils/constants";

function PageNavbar() {

    const { user, logout } = useAuth();
    const navLinks = [
        { title: "Protected Path", path: "#" },
    ];
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Nav.Link as={Link} to="/">
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top mx-2 rounded-circle infinite-rotate"
                        />
                        {PAGE_TITLE}
                    </Navbar.Brand>
                </Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {user &&
                            navLinks.map((item, i) => (
                                <Nav.Item key={i}>
                                    <Nav.Link as={Link} to={item.path}>{item.title}</Nav.Link>
                                </Nav.Item>
                            ))}

                    </Nav>
                    <Nav>
                        {user && <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink} className="d-flex align-item-center" id="dropdown-basic">
                                <Image
                                    src={getUserAvatar(user?.name, 30)}
                                    className="user-avatar rounded-circle"
                                />
                                <div style={{ width: "5px" }}></div>
                                <span className="my-0 font-small fw-semibold">
                                    {user?.name ?? "Unknown"}
                                </span>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    style={{ margin: "5px 0 0 5px" }}
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="fw-semibold" onClick={logout}>
                                    <FontAwesomeIcon
                                        icon={faSignOutAlt}
                                        className="text-danger me-2"
                                        style={{ width: "20px" }}
                                    />{" "}
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        }


                        {!user && (
                            <Nav.Item>
                                <Nav.Link as={Link} to="/signin">Login/Sign-Up</Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default PageNavbar;