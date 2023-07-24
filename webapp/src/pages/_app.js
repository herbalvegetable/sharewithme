import { useState, createContext } from 'react';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';

import AppContext from '@/components/AppContext/AppContext';

export default function App({ Component, pageProps, session }) {

	const [nameContext, setNameContext] = useState('defaultName');
	const [emailContext, setEmailContext] = useState('defaultEmail');

	return (
		<AppContext.Provider value={{
			nameContext, setNameContext,
			emailContext, setEmailContext,
		}}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</AppContext.Provider>
	)
}
