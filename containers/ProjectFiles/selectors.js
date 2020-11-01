import {createSelector} from 'reselect';
import {name, initialState} from './slice';

/**
 * Direct selector to the state domain
 */

const selectProjectFilesDomain = (state) => state[name]// || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used
 */

const makeSelectProjectFiles = () =>
    createSelector(selectProjectFilesDomain, (substate) => {
        return {
            ...substate,
            data:
                (substate.data.name ? Object.entries(substate.data.name).sort(([, a], [, b]) => {
                        return new Date(b.dateCreated) - new Date(a.dateCreated)
                    }
                ).reduce((r, [k, v]) => ({...r, [k]: v}), {}) : {})
        };
    });

export {selectProjectFilesDomain, makeSelectProjectFiles};