/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useSelector, shallowEqual } from 'react-redux';
import useQueryWithStore from './useQueryWithStore';
import { GET_LIST, CRUD_GET_LIST } from '../actions';

/* 
import { useGetList } from '@stbui/prophet-core';

const UserList = () => {
    const { data, ids, loading, error } = useGetList(
        'users',
        { page: 1, perPage: 10 },
        { username: 'stbui' },
        { field: 'id', order: 'DESC' }
    );

    if (loading) {
        return 'loading';
    }

    if (error) {
        return error.message;
    }


    return <div>{ids.map(id => data[id].username)}</div>;
};
 */

export const useGetList = (
    resource: string,
    pagination: Object,
    filter: Object,
    sort: Object,
    options?: any
) => {
    const { data: ids, total, loading, loaded, error } = useQueryWithStore(
        {
            type: GET_LIST,
            resource,
            payload: { pagination, filter, sort },
        },
        { ...options, action: CRUD_GET_LIST },
        state =>
            state.resources[resource]
                ? state.resources[resource].list.ids
                : null,
        state =>
            state.resources[resource]
                ? state.resources[resource].list.total
                : null
    );

    const data = useSelector(
        (state: any) =>
            state.resources[resource] ? state.resources[resource].data : null,
        shallowEqual
    );

    return { data, ids, total, loading, loaded, error };
};

export default useGetList;
