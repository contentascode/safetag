import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import produce from 'immer';
import * as _ from 'ramda';
// import lunr from 'lunr';
// import { useLunr } from 'react-lunr';
import data from '../static/content/content.json';

// actions.js
export const selectMethod = ({ key }) => ({
  type: 'SELECT_METHOD',
  key,
});

export const deselectMethod = ({ key }) => ({
  type: 'DESELECT_METHOD',
  key,
});

export const switchMethod = ({ key }) => ({
  type: 'SWITCH_METHOD',
  key,
});

export const selectActivity = ({ key }) => ({
  type: 'SELECT_ACTIVITY',
  key,
});

export const deselectActivity = ({ key }) => ({
  type: 'DESELECT_ACTIVITY',
  key,
});

export const switchPlan = checked => ({
  type: 'SWITCH_PLAN',
  checked,
});

export const toggleActivityFocus = ({ key }) => ({
  type: 'TOGGLE_ACTIVITY_FOCUS',
  key,
});

export const toggleMethodFocus = ({ key }) => ({
  type: 'TOGGLE_METHOD_FOCUS',
  key,
});

export const toggleActivityExpand = ({ key }) => ({
  type: 'TOGGLE_ACTIVITY_EXPAND',
  key,
});

export const toggleMethodExpand = ({ key }) => ({
  type: 'TOGGLE_METHOD_EXPAND',
  key,
});

export const showResults = results => ({
  type: 'SHOW_RESULTS',
  results,
});

// reducers.js
export const global = (state = {}, action) => produce(state, (draft) => {
  switch (action.type) {
    case 'SWITCH_PLAN':
      draft.plan = action.checked;
  }
});

export const methods = (state = {}, action) => produce(state, (draft) => {
  switch (action.type) {
    case 'SELECT_METHOD':
      draft[action.key].selected = true;
      return;

    case 'DESELECT_METHOD':
      draft[action.key].selected = false;
      return;

    case 'SWITCH_METHOD':
      // In browse mode, Menu is not multiple and doesn't call deselect
      Object.keys(draft).forEach((key) => {
        draft[key].selected = action.key == key;
      });
      return;

    case 'TOGGLE_METHOD_FOCUS':
      draft[action.key].focused = !state[action.key].focused;
      return;

    case 'TOGGLE_METHOD_EXPAND':
      draft[action.key].expanded = !state[action.key].expanded;
      return;

    case 'SWITCH_PLAN':
      Object.keys(draft).forEach((key) => {
        draft[key].selected = false;
      });
  }
});

export const activities = (state = {}, action) => produce(state, (draft) => {
  // console.log('action', action);
  switch (action.type) {
    case 'SELECT_ACTIVITY':
      draft[action.key].selected = true;
      return;

    case 'DESELECT_ACTIVITY':
      draft[action.key].selected = false;
      return;

    case 'EXPAND_ACTIVITY':
      draft[action.key].expanded = true;
      return;

    case 'COLLAPSE_ACTIVITY':
      draft[action.key].expanded = false;
      return;

    case 'SELECT_METHOD':
      Object.keys(draft).forEach((key) => {
        if (draft[key].id_method == action.key) draft[key].visible = true;
      });
      return;

    case 'DESELECT_METHOD':
      Object.keys(draft).forEach((key) => {
        if (draft[key].id_method == action.key) draft[key].visible = false;
      });
      return;

    case 'SWITCH_METHOD':
      // In browse mode, Menu is not multiple and doesn't call deselect
      Object.keys(draft).forEach((key) => {
        if (draft[key].id_method == action.key) {
          draft[key].visible = true;
        } else {
          draft[key].visible = false;
        }
      });
      return;

    case 'TOGGLE_ACTIVITY_FOCUS':
      draft[action.key].focused = !state[action.key].focused;
      return;

    case 'TOGGLE_ACTIVITY_EXPAND':
      draft[action.key].expanded = !state[action.key].expanded;
      return;

    case 'SWITCH_PLAN':
      Object.keys(draft).forEach((key) => {
        draft[key].selected = false;
      });
      return;

    case 'SHOW_RESULTS':
      Object.keys(draft).forEach((key) => {
        draft[key].visible = action.results.includes(key);
      });
  }
});

export const content = (state = {}, action) => state;

export const reducers = combineReducers({
  methods,
  activities,
  content,
  global,
});

// store.js

// Add selected key to Methods and Activities in content
const selectable = item => ({ ...item, selected: false });
const selected = item => ({ ...item, selected: true });
const visible = item => ({ ...item, visible: false });
const expandable = item => ({ ...item, expanded: false });
const focusable = item => ({ ...item, focused: false });

const reindexed = obj => Object.assign(
  ...Object.entries(obj).map(([_, { content, id }]) => ({
    [`${content}.md`]: { id },
  })),
);

const initial = {
  methods: _.compose(
    _.map(selectable),
    _.map(expandable),
    _.map(focusable),
  )(data.methods),
  activities: _.compose(
    _.map(selected),
    _.map(visible),
    _.map(expandable),
    _.map(focusable),
  )(data.activities),
  content: { /* ...reindexed(data.methods), */ ...reindexed(data.activities) },
  global: { plan: false },
};

// const file = require('../static/content/searchIndex.json');

// const idx = lunr(function () {
//   this
//   this.pipeline.remove(lunr.stemmer);
//   this.pipeline.remove(lunr.stopWordFilter);
// });
//
// const idx = lunr.Index.load(file);
// // console.log('idx', idx);
// idx.pipeline.remove(lunr.stemmer);
// const res = idx.search('digital');
// console.log('res', res);
export const initializeStore = (initialState = initial) => createStore(
  reducers,
  initialState,
  composeWithDevTools({ actionCreators: { selectMethod, deselectMethod }, trace: true })(),
);
