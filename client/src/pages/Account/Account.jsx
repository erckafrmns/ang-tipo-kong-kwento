import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
 
import modalLine from '../../assets/modal-line.svg'; 
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import Footer from '../../components/Footer/Footer'; 

import './Account.css' 


const Account = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); 
    const [isChecked, setIsChecked] = useState(false);


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.error("No authorization token found.");
                    return;
                }

                const response = await axios.get("http://localhost:5000/get-user-info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
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

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error('Authentication token not found. Please log in again.');
                return;
            }

            const response = await axios.put("http://localhost:5000/change-password",
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

            toast.success(response.data.message);
            handleCloseModal();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                console.error("Error changing password:", error);
                toast.error('An error occurred while changing the password.');
            }
        }
    };


    const handleOpenDeleteAccountModal = () => {
        setIsDeleteAccountModalOpen(true);
    };

    const handleCloseDeleteAccountModal = () => {
        setIsDeleteAccountModalOpen(false);
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error('Authentication token not found. Please log in again.');
                return;
            }

            await axios.delete("http://localhost:5000/delete-account", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success('Account deleted successfully.');
            localStorage.removeItem("authToken");
            navigate("/");
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error('An error occurred while deleting the account.');
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
            
                    <div className="account-group account-buttons">
                    <button onClick={handleOpenModal} className="changePass-btn">
                        Change Password
                    </button> 
                    <button className="delete-btn" onClick={handleOpenDeleteAccountModal}>
                        Delete Account
                    </button> 
                    </div>
                </section>

                {isModalOpen && (
                    <div className="account-modal-container">
                        <div className="modal-change-password">
                            <h2>Change Password</h2>
                            <img src={modalLine} alt="Modal Line" className="modal-line" /> 
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

                {isDeleteAccountModalOpen && (
                    <div className="account-modal-container">
                        <div className="modal-delete-account"> 
                            <h2>Delete Account</h2> 
                            <img src={modalLine} alt="Modal Line" className="modal-line" /> 
                            <p>Deleting your account will remove all of your information from our database. This cannot be undone.</p> 
                            <div className="checkbox-container">
                                <input   
                                    className="checkbox-input"
                                    type="checkbox" 
                                    id="readConfirmation" 
                                    onChange={(e) => setIsChecked(e.target.checked)} 
                                />
                                <label className="checkbox-label" htmlFor="readConfirmation">I have read and understood the above statement.</label>
                            </div>
                            <div className="account-modal-buttons">
                                <button 
                                    className="delete-account-confirm-btn" 
                                    onClick={handleDeleteAccount} 
                                    disabled={!isChecked} 
                                >
                                    Delete
                                </button>
                                <button onClick={handleCloseDeleteAccountModal} className="delete-account-cancel-btn">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div> 
            <Footer isAlternative={true} />
        </>
    );
};

export default Account;
