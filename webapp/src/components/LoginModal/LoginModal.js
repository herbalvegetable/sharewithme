import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {useSession, signIn, signOut} from 'next-auth/react';
import axios from 'axios';

import styles from './LoginModal.module.css';

export default function LoginModal(props) {

    const {data: session} = useSession();

    const { isOpen, setModalOpen } = props;

    useEffect(() => {

    }, []);

    return (
        <Modal
            className={styles.modal}
            isOpen={isOpen}
            ariaHideApp={false}>
            <div className={styles.header}>
                <span className={styles.title}>Login</span>
            </div>
            <div className={styles.body}>
                <button
                    onClick={e => signIn()}>
                    Login
                </button>
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