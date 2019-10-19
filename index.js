import React, { Fragment } from 'react';

import reducer from './reducer';
import Data from './Data';
import Store from './Store';
import Actions from './Actions';
import Events from './Events';
import Request from './Request';
import Logic from './Logic';

export default function CompetitionsContainer({ children, request }) {
    return (
        <Data>
            {({ actions: globalActions, ...stateCommon }) => (
                <Store reducer={reducer}>
                    {({ state, dispatch }) => (
                        <Fragment>
                            <Actions dispatch={dispatch}>
                                {({ actions }) => {
                                    const extActions = {
                                        ...actions,
                                        ...globalActions,
                                    };

                                    return (
                                        <Request
                                            request={request}
                                            actions={actions}
                                        >
                                            <Logic
                                                state={state}
                                                stateCommon={stateCommon}
                                                actions={extActions}
                                            >
                                                {logicProps =>
                                                    children({
                                                        state,
                                                        actions: extActions,
                                                        ...stateCommon,
                                                        ...logicProps,
                                                    })
                                                }
                                            </Logic>
                                        </Request>
                                    );
                                }}
                            </Actions>
                            <Events
                                dispatch={dispatch}
                                actions={globalActions}
                                state={state}
                            />
                        </Fragment>
                    )}
                </Store>
            )}
        </Data>
    );
}
