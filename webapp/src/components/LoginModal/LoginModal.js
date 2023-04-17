import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import styles from './LoginModal.module.css';

export default function LoginModal(props) {

    const { isOpen, setModalOpen } = props;

    useEffect(() => {

    }, []);

    const onLoginSuccess = res => {
        console.log('LOGIN SUCCESS! Current user: ', res.profileObj)
    }
    const onLoginFailure = res => {
        console.log('LOGIN FAILED! res: ', res);
    }

    return (
        <Modal
            className={styles.modal}
            isOpen={isOpen}
            ariaHideApp={false}>
            <div className={styles.header}>
                <span className={styles.title}>Login</span>
            </div>
            <div className={styles.body}>
                {/* <GoogleLogin 
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}/> */}
            </div>
            <div className={styles.footer}>
                <button
                    className={styles.close_btn}
                    onClick={e => setModalOpen(false)}>
                    Cancel
                </button>
            </div>
        </Modal>
    )
}