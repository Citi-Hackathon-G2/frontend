import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../authentication';
import { PATHS } from '../config/routes';

export const Me: React.FC<{}> = () => {
    let history = useHistory();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        history.push(PATHS.LOGIN);
    };

    return (
        <button
            style={{ marginTop: '50%', marginLeft: '40%' }}
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};
