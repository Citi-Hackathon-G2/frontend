import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
} from 'react';
import firebase from 'firebase/app';
import {
  login,
  logout,
  useFirebaseAuthentication,
  UserModel,
} from '../utils/index';
import { useUser } from '../utils/helpers/user';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  firebaseUser: firebase.User | null | undefined;
  idToken: string;
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: typeof login;
  logout: typeof logout;
};

const AuthContext = createContext<AuthContextType>({
  firebaseUser: undefined,
  idToken: '',
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login,
  logout,
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const firebaseUser: firebase.User | null | undefined =
    useFirebaseAuthentication();
  const [idToken, setIdToken] = useState<string>('');
  const [userUid, setUserUid] = useState<string>('');
  const user: UserModel | null = useUser(userUid);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      if (firebaseUser === undefined) {
        // ignore on mount
        return;
      }

      if (firebaseUser === null) {
        setIdToken('');
      } else {
        try {
          const [userUid, idToken] = await Promise.all([
            firebaseUser.uid,
            firebaseUser.getIdToken(),
          ]);

          setUserUid(userUid);
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
