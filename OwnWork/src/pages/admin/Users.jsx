import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  GetUsers,
  UserCreation,
  UserDeletion,
  UserUpdate,
} from "../../components/API";
import Form from "react-bootstrap/Form";
import butterfly from "../../imgs/butterfly.png";
import Table from "react-bootstrap/Table";
import { ImBin } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

const Users = () => {
  const navigate = useNavigate();
  const admin = Cookies.get("admin");
  const user = Cookies.get("user");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminValue, setAdminValue] = useState(false);
  const [usersData, setUsersData] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [CreateUserSuccess, setCreateUserSuccess] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editName, setEditName] = useState("");
  const [editAdmin, setEditAdmin] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [editMode, setEditMode] = useState(false);

  // UseEffect to check if user is logged in and has admin privileges
  useEffect(() => {
    const isLoggedIn = !!user;
    const isAdmin = !!admin;

    if (!isLoggedIn) {
      navigate("/login");
    }

    if (!isAdmin) {
      navigate("/notAdmin");
    }
  }, [navigate, user, admin]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await GetUsers();
        setUsersData(response); // Update the state with the user data from the response
      } catch (error) {
        console.log("Error occurred while getting users", error);
      }
    };
    getAllUsers();
  }, [toggle]);

  const openModal = (userId, email, password, name, admin) => {
    setEditUserId(userId);
    setEditEmail(email);
    setEditPassword(password);
    setEditName(name);
    setEditAdmin(admin);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return;
    }

    try {
      // Call the CreateUser function from the API with the provided name, email, password, and admin value
      await UserCreation(email, password, name, adminValue);
      setCreateUserSuccess(true);
      setToggle(!toggle);
    } catch (error) {
      setErrorMsg("Error occurred during sign up, see console for details");
      console.log("Error occurred during sign up", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteUserId(id);
    setShowModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await UserDeletion(deleteUserId);
      setToggle(!toggle);
      setShowModal(false);
    } catch (error) {
      console.log("Error occurred while deleting user", error);
    }
  };

  const handleEdit = async (id, email, password, name, admin) => {
    setEditMode(true);
    openModal(id, email, password, name, admin);
  };

  const handleEditSubmit = async () => {
    try {
      await UserUpdate(
        editUserId,
        editEmail,
        editPassword,
        editName,
        editAdmin
      );
      setToggle(!toggle);
      closeModal();
      setEditMode(false);
    } catch (error) {
      console.log("Error occurred during user update", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <img src={butterfly} alt="butterfly" className="img-fluid" />
      </div>
      <h1 className="mb-5 text-center">Users</h1>
      <Container>
        <div className="row">
          <section className="col-lg-6">
            <h1>Create User</h1>
            {CreateUserSuccess ? (
              <p className="alert alert-success w-50">
                User successfully created
              </p>
            ) : (
              errorMsg && <p className="alert alert-danger w-50">{errorMsg}</p>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="nameCreate"
                  className="input-grey w-50"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  id="emailCreate"
                  className="input-grey w-50"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  id="passwordCreate"
                  placeholder="Password"
                  className="input-grey w-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAdmin">
                <Form.Select
                  className="input-grey w-50"
                  value={adminValue}
                  onChange={(e) => setAdminValue(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>

              <button className="btn btn-pink btn-round w-50" type="submit">
                Create user
              </button>
            </Form>
          </section>
          <section className="col-lg-6">
            <h1>Our Users</h1>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersData &&
                  usersData.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>Hidden</td>
                      <td>{user.admin.toString()}</td>
                      <td>
                        <BiEdit
                          className="me-3 Pointer"
                          onClick={() =>
                            handleEdit(
                              user._id,
                              user.email,
                              user.password,
                              user.name,
                              user.admin
                            )
                          }
                        />
                        <ImBin
                          className="Pointer"
                          onClick={() => handleDelete(user._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </section>
        </div>

        <Modal show={showModal} onHide={closeModal} centered>
          {deleteUserId ? (
            /* Delete Confirmation Modal */
            <>
              <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this user?</p>
              </Modal.Body>
              <Modal.Footer className="justify-content-start">
                <button className="btn btn-pink btn-round" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="btn btn-pink btn-round"
                  onClick={confirmDeleteUser}
                >
                  Delete
                </button>
              </Modal.Footer>
            </>
          ) : (
            editMode && (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      id="nameEdit"
                      className="input-grey w-50"
                      placeholder="Enter new name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      id="emailEdit"
                      className="input-grey w-50"
                      placeholder="Enter new email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      id="passwordEdit"
                      placeholder="New Password (Optional)"
                      className="input-grey w-50"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicAdmin">
                    <Form.Select
                      className="input-grey w-50"
                      value={editAdmin}
                      onChange={(e) => setEditAdmin(e.target.value === "true")}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Form.Select>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                  <button
                    className="btn btn-pink btn-round"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-pink btn-round"
                    onClick={handleEditSubmit}
                  >
                    Save Changes
                  </button>
                </Modal.Footer>
              </>
            )
          )}
        </Modal>
      </Container>
    </div>
  );
};

export default Users;
