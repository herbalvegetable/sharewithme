import React, { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';

export default function Auth(props) {
    const { data: session, status } = useSession();
    const { handleAuthSession, handleAuthStatus } = props;

    useEffect(() => {
        handleAuthSession && handleAuthSession(session);
        handleAuthStatus && handleAuthStatus(status);
    }, [session, status]);

    return null;
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    return {
        props: { session },
    }
}