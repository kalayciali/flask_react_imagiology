// helper utils funcs to interact with api
// there is createSlice from redux but 
// I haven't practiced it yet

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export function createRequestTypes(base) {
  if (!base) {
    throw new Error('cannot create request type with base = \'\' or base = null');
  }
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createAction(type, payload = {}) {
  return {
    type,
    ...payload,
  };
}

