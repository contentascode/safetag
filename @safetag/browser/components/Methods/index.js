import { useState, useEffect } from 'react';
import { lifecycle, withState, compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Menu, Icon, Card, Input, Switch, Popover,
} from 'antd';

import { Lunr, useLunr } from 'react-lunr';

import {
  selectMethod, deselectMethod, switchMethod, switchPlan, showResults,
} from '../../store';
import './style.less';

const { SubMenu, ItemGroup, Item } = Menu;
const { Search } = Input;

const results = withState('results', 'setResults', []);

const startup = lifecycle({
  componentDidMount() {
    // Start with the id 1 selected
    this.props.dispatch(selectMethod({ key: 0 }));
  },
  componentDidUpdate(oldProps) {
    // console.log('oldProps', oldProps);
    // console.log('this.props.results', this.props.results);
    // if (this.props.results && oldProps.results.length !== this.props.results.length) this.props.dispatch(showResults(this.props.results.filter(x => x).map(({ id }) => id)));
  },
});

const file = require('../../static/content/searchIndex.json');

const index = JSON.stringify(file);

const Methods = ({
  dispatch, methods, plan, content, setResults,
}) => {
  const [query, setQuery] = useState(null);
  const res = useLunr(query, index, JSON.stringify(content));
  // setResults([]);
  // const res = useLunr(query, index, JSON.stringify(content));
  useEffect(() => {
    // console.log('useEffect.res', res);
    // setResults(res);
    dispatch(showResults(res.filter(x => x).map(({ id }) => id)));
  });
  return (
    <div>
      <div style={{ padding: '8px 16px' }}>
        <img width="100%" src="/static/logo.svg" alt="SAFETAG" />
        <p style={{ fontSize: 14, textTransform: 'uppercase' }}>
          A Security Auditing Framework and Evaluation Template for Advocacy Groups
        </p>
        <Search
          placeholder="input search text"
          onSearch={(value) => {
            console.log('setQuery.value', value);
            setQuery(value);
          }}
          // style={{ width: 200 }}
        />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub1']}
        multiple={plan}
        onSelect={i => (plan ? dispatch(selectMethod(i)) : dispatch(switchMethod(i)))}
        onDeselect={i => dispatch(deselectMethod(i))}
      >
        <ItemGroup
          key="g1"
          title={
            <>
              <span style={{ marginRight: 18 }}>
                <Icon type="tags" />
                {' '}
Methods
              </span>
              <Popover
                placement="topLeft"
                content={(
                  <div>
                    <p>
                      <strong>Browse</strong>
                      {' '}
mode helps navigate the SAFETAG content.
                    </p>
                    <p>
                      <strong>Plan</strong>
                      {' '}
mode is a preview of an Audit Planning tool.
                    </p>
                  </div>
)}
              >
                <Switch
                  checkedChildren="Plan"
                  unCheckedChildren="Browse"
                  onChange={checked => dispatch(switchPlan(checked))}
                />
              </Popover>
            </>
          }
        >
          {Object.keys(methods).map(id => (
            <Item key={id}>
              <Popover
                placement="topLeft"
                content={`${methods[id].description}`}
                overlayStyle={{ width: 200 }}
              >
                {methods[id].name}
              </Popover>
            </Item>
          ))}
        </ItemGroup>

        {/* </SubMenu> */}
      </Menu>
    </div>
  );
};

export default compose(
  results,
  connect(({ methods, content, global: { plan } }) => ({ methods, content, plan })),
  startup,
)(Methods);
