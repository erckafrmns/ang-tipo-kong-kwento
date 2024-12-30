import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const Account = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "********",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.error("No authorization token found.");
                    return;
                }

                console.log("Authorization Token:", token);

                const response = await axios.get("http://localhost:5000/get-user-info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    password: response.data.password.replace(/./g, '*'), // Mask the password
                });
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("Authentication token not found. Please log in again.");
                return;
            }

            const response = await axios.post("http://localhost:5000/change-password",
                {
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_new_password: confirmPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);
            handleCloseModal();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                console.error("Error changing password:", error);
                alert("An error occurred while changing the password.");
            }
        }
    };


    return (
        <>
            <div className="account">
                <div className="account-details">
                    <h2>Account Details</h2>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" value={user.first_name} disabled className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" value={user.last_name} disabled className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={user.email} disabled className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={user.password} disabled className="form-control"/>
                    </div>
                    <button onClick={handleOpenModal} className="btn btn-primary">
                        Change Password
                    </button>
                </div>

                <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Change Password Modal" className="modal" overlayClassName="overlay">
                    <h2>Change Password</h2>
                    <form onSubmit={handlePasswordChange}>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>

                        <button type="submit" className="btn btn-success">Submit</button>
                        <button type="button" onClick={handleCloseModal} className="btn btn-secondary">Cancel</button>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default Account;
