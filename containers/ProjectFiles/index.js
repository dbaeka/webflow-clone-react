import React, {useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {useInjectReducer, useInjectSaga} from 'redux-injectors';
import {makeSelectProjectFiles} from './selectors';
import saga from './saga';
import {name, reducer, actions} from './slice';

export function useProjectFiles({limit = 50, offset = 0} = {}) {
    useInjectReducer({key: name, reducer});
    useInjectSaga({key: name, saga});

    const dispatch = useDispatch();
    const store = useSelector(makeSelectProjectFiles(), shallowEqual);

    const dispatchMoveFile = ({source, dest}) => dispatch(actions.moveFile({source, dest}))

    useEffect(() => {
        if (!store?.data?.length && store?.loading) {
            dispatch(
                actions.fetch({
                    offset,
                    limit,
                }),
            );
        }
    }, []);

    return [store, dispatchMoveFile];
}