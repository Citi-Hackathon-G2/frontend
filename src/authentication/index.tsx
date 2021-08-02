import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    FC,
} from 'react';
import { Spin } from 'antd';
import firebase from 'firebase/app';
import { login, logout, useFirebaseAuthentication } from '../utils/index';

type AuthProviderProps = {
    children: React.ReactNode;
};

type AuthContextType = {
    firebaseUser: firebase.User | null;
    idToken: string;
    user: {} | null; //TODO: get user type
    isAuthenticated: boolean;
    isLoading: boolean;
    login: typeof login;
    logout: typeof logout;
};

const AuthContext = createContext<AuthContextType>({
    firebaseUser: null,
    idToken: '',
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login,
    logout,
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const firebaseUser: firebase.User | null = useFirebaseAuthentication();
    const [idToken, setIdToken] = useState<string>('');
    const [user, setUser] = useState<{} | null>(null); //TODO: get user type
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            if (firebaseUser === null) {
                setUser(null);
                setIdToken('');
            } else {
                // TODO: may need to setInterval to refresh idToken periodically
                try {
                    const [user, idToken] = await Promise.all([
                        // TODO: get single user api
                        // getSingleUser({ id: firebaseUser.uid }),
                        firebaseUser.getIdToken(),
                    ]);
                    setUser(user);
                    setIdToken(idToken);
                } catch (error) {
                    await logout();
                }
            }

            setIsAuthenticated(firebaseUser !== null);
            setIsLoading(false);
        })();
    }, [firebaseUser]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                firebaseUser,
                idToken,
                user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    return useContext<AuthContextType>(AuthContext);
};
/*
https://medium.com/@tafka_labs/auth-redirect-in-nextjs-3a3a524c0a06
export const ProtectRoute:  = ({ Component: Component, ...rest }) => {
  return () => {
    const { firebaseUser, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) Router.push("/login");
    }, [loading, isAuthenticated]);

    return <Component {...rest} />;
  };
};
*/
