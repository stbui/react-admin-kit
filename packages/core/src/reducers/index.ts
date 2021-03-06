/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import resources, { getResources as GetResources } from './resources';
import loading from './loading';
import notifications from './notifications';
import refresh from './refresh';

export const getResources = state => GetResources(state.resources);

export default (history, customReducers) =>
    combineReducers({
        resources,
        loading,
        notifications,
        refresh,
        ...customReducers,
        router: connectRouter(history),
    });
