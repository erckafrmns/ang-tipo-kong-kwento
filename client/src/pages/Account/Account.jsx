import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';  
 
import modalLine from '../../assets/modal-line.svg'; 
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import Footer from '../../components/Footer/Footer'; 

import './Account.css' 


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
            <InsideNavbar />
                <section className="account-details">
                    <h1>Account Details</h1> 
                    <div className="account-group">
                        <label>First Name</label>
                        <input type="text" value={user.first_name} disabled className="account-control"/>
                    </div>
                    <div className="account-group">
                        <label>Last Name</label>
                        <input type="text" value={user.last_name} disabled className="account-control"/>
                    </div>
                    <div className="account-group">
                        <label>Email</label>
                        <input type="email" value={user.email} disabled className="account-control"/>
                    </div>
                    <div className="account-group">
                        <label>Password</label>
                        <input type="password" value={user.password} disabled className="account-control"/>
                    </div> 
                    <div className="account-group account-buttons">
                    <button onClick={handleOpenModal} className="changePass-btn">
                        Change Password
                    </button> 
                    <button className="delete-btn">
                        Delete Account
                    </button> 
                    </div>
                </section>

                {isModalOpen && (
                        <div className="account-modal-container">
                            <div className="modal-change-password">
                            <h2>Change Password</h2>
                            <img src={modalLine} alt="Modal Line" className="modal-line" /> {/* Replaced div with an image */}
                            <form onSubmit={handlePasswordChange}>
                                <div className="form-group">
                                <input type="password" id="currentPassword" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="form-control"/>
                                </div>

                                <div className="form-group">
                                <input type="password" id="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="form-control"/>
                                </div>

                                <div className="form-group">
                                <input type="password" id="confirmPassword" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="form-control"/>
                                </div>

                                <div className="account-modal-buttons">
                                <button type="submit" className="change-password-confirm-btn">
                                    Submit
                                </button>
                                <button type="button" onClick={handleCloseModal} className="change-password-cancel-btn">
                                    Cancel
                                </button>
                                </div>
                            </form>
                            </div>
                        </div>
                        )}

            </div> 
            <Footer isAlternative={true} />
        </>
    );
};

export default Account;
