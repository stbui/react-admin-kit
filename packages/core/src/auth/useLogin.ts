/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuthProvider, { defaultAuthParams } from './useAuthProvider';

type Login = (params: any, pathName?: string) => Promise<any>;

/**
 *
 * @example
 *
 * import { useLogin } from '@stbui/prophet-core';
 *
 * const LoginButton = () => {
 *      const login = useLogin();
 *      const onClick = () => {
 *          login({username:'stbui', password: '123456' }, '/user').then(()=>{
 *              console.log('ok')
 *          })
 *      }
 *      return <button onclick={onClick}>login</buton>
 * }
 */
const useLogin = (): Login => {
    const authProvider = useAuthProvider();
    const history = useHistory();
    const location = useLocation();
    // @ts-ignore
    const nextPathName = location.state && location.state.nextPathname;

    const login = useCallback(
        (params: any = {}, pathName) =>
            authProvider.login(params).then(res => {
                const redirectUrl = pathName
                    ? pathName
                    : nextPathName || defaultAuthParams.afterLoginUrl;
                history.push(redirectUrl);

                return res;
            }),
        [authProvider, history, nextPathName]
    );

    const loginWithoutProvider = useCallback(() => {
        history.push(defaultAuthParams.afterLoginUrl);
        return Promise.resolve();
    }, [history]);

    return authProvider ? login : loginWithoutProvider;
};

export default useLogin;
