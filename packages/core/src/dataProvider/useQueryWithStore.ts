import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDataProvider from './useDataProvider';
import { isEqual } from '../util';

/* 
import { useQueryWithStore } from 'prophet-core';

const UserProfile = record => {
    const { data, loading, error } = useQueryWithStore(
        {
            type: 'GET_ONE',
            resource: 'users',
            payload: { id: record.id },
        },
        {},
        state => state.resource.user.data[record.id]
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return <div>{data.username}</div>;
};
 */

export interface Query {
    type: string;
    resource: string;
    payload: object;
}

const isEmptyList = data =>
    Array.isArray(data)
        ? data.length === 0
        : data &&
          Object.keys(data).length === 0 &&
          data.hasOwnProperty('fetchedAt');

const useQueryWithStore = (
    query: Query,
    options,
    dataSelector: (state) => any = () => undefined,
    totalSelector?: (state) => number
) => {
    const { type, resource, payload } = query;
    const data = useSelector(dataSelector);
    const total = useSelector(totalSelector);

    const [state, setState]: any = useState({
        data,
        total,
        error: null,
        loading: true,
        loaded: data !== undefined && !isEmptyList(data),
    });
    const dataProvider = useDataProvider();

    if (!isEqual(state.data, data) || state.total !== total) {
        setState({
            ...state,
            data,
            total,
            loaded: true,
        });
    }

    useEffect(() => {
        dataProvider(type, resource, payload, options)
            .then(() => {
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                    loaded: true,
                }));
            })
            .catch(error => {
                setState({
                    error,
                    loading: false,
                    loaded: false,
                });
            });
    }, [JSON.stringify({ query, options })]);

    return state;
};

export default useQueryWithStore;
