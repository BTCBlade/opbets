import { loadEventsAll } from './events';
import { updateBalance } from './session';

const ADD_ONE = 'wagerslip/ADD_ONE';
const REMOVE_ONE = 'wagerslip/REMOVE_ONE';

export const addOne = (row) => {
  console.log(row);
  return {
    type: ADD_ONE,
    payload: row,
  };
};

export const removeOne = (row) => {
  return {
    type: REMOVE_ONE,
    payload: row,
  };
};
export const submitWager = (user_id, db_predictions_id, amount) => async (
  dispatch
) => {
  //1. send db_predictions_id in req.body to /api/wagers/
  const res = await fetch('/api/wagers/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: user_id,
      db_predictions_id: db_predictions_id,
      amount: amount,
    }),
  });
  //2. update session.balance
  await dispatch(updateBalance(user_id));
  //3. update/reload store.events
  await dispatch(loadEventsAll());
};

const initialState = { wagers: {}, order: [] };

export default function wagerslipReducer(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ADD_ONE:
      newState.wagers[action.payload.db_predictions_id] = {
        db_predictions_id: action.payload.db_predictions_id,
        league_name: action.payload.league_name,
        time: action.payload.time,
        team_name: action.payload.team_name,
        team_img: action.payload.team_img,
        odds: action.payload.odds,
      };
      if (!newState.order.includes(action.payload.db_predictions_id)) {
        newState.order.push(action.payload.db_predictions_id);
      }
      return newState;
    case REMOVE_ONE:
      newState.wagers[action.payload.db_predictions_id] = undefined;
      const idx = newState.order.indexOf(action.payload.db_predictions_id);
      newState.order.splice(idx, 1);
      return newState;
    default:
      return state;
  }
}
