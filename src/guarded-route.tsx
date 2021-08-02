import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PATHS } from './config/routes';
import { Layout } from './components';
const GuardedRoute = ({
    component: Component,
    isAuthenticated,
    path,
}: {
    component: any;
    isAuthenticated: boolean;
    path: string;
}) => (
    <Route
        exact
        path={path}
        render={(props) =>
            isAuthenticated === true ? (
                <Layout>
                    <Component {...props} />
                </Layout>
            ) : (
                <Redirect to={PATHS.LOGIN} />
            )
        }
    />
);

const AuthRoute = ({
    component: Component,
    isAuthenticated,
    path,
}: {
    component: any;
    isAuthenticated: boolean;
    path: string;
}) => (
    <Route
        exact
        path={path}
        render={(props) =>
            isAuthenticated === true ? (
                <Redirect to={PATHS.HOME} />
            ) : (
                <Layout>
                    <Component {...props} />
                </Layout>
            )
        }
    />
);

export { AuthRoute, GuardedRoute };
