import { Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { withState, compose } from 'recompose';
import {
  Popover, Table, Icon, Tag,
} from 'antd';

import {
  selectActivity,
  deselectActivity,
  toggleActivityFocus,
  toggleMethodFocus,
  toggleActivityExpand,
  toggleMethodExpand,
} from '../../store';

import './style.less';

const columns = dispatch => [
  {
    title: 'Method',
    dataIndex: 'name',
    width: '50%',
    render: (text, row) => (row.method ? (
      {
        children: (
          <Fragment>
            <Icon type="tag" />
            {row.description ? (
              <Popover
                placement="topLeft"
                content={row.description}
                overlayStyle={{ width: 400 }}
              >
                <span style={{ marginLeft: 8 }}>{text}</span>
              </Popover>
            ) : (
              <span style={{ marginLeft: 8 }}>{text}</span>
            )}
          </Fragment>
        ),
        props: {
          colSpan: 2,
        },
      }
    ) : row.description ? (
      <Popover placement="topLeft" content={row.description} overlayStyle={{ width: 400 }}>
        {text}
      </Popover>
    ) : (
      text
    )),
  },
  {
    title: 'Data',
    dataIndex: 'time_required_minutes',
    width: '45%',
    render: (time, {
      method, skills_required, org_size_under, approach,
    }) => (method ? (
      {
        children: null,
        props: {
          colSpan: 0,
        },
      }
    ) : (
      <span>
        {time && time != 'unknown' && (
        <Popover
          placement="topLeft"
          content={`${time} minutes required to complete the activity `}
        >
          <Tag color="purple" key={time}>
            {time}
            {' '}
min
          </Tag>
        </Popover>
        )}
        {approach
          ? approach
            .split(',')
            .filter(approach => approach !== 'N/A' && approach !== 'unknown')
            .map(approach => (
              <Popover placement="topLeft" content={`Requires a ${approach} Approach`}>
                <Tag
                  color={
                        approach === 'Technical'
                          ? 'geekblue'
                          : approach === 'Research'
                            ? 'green'
                            : 'red'
                      }
                  key={approach}
                >
                  {approach.trim()}
                </Tag>
              </Popover>
            ))
          : null}
        {org_size_under && org_size_under != 'N/A' && org_size_under != 'unknown' ? (
          <Popover placement="topLeft" content={`Organisation under ${org_size_under} people`}>
            <Tag key={org_size_under}>
              <Icon type="usergroup-delete" />
              {org_size_under}
            </Tag>
          </Popover>
        ) : null}
        {skills_required
          ? skills_required
            .split(',')
            .filter(skill => skill.trim() !== 'N/A' && skill.trim() != 'unknown')
            .map(skill => (
              <Popover placement="topLeft" content={`${skill} is a required skill`}>
                <Tag key={skill}>
                  <Icon type="read" />
                      &nbsp;
                  {skill.trim()}
                </Tag>
              </Popover>
            ))
          : null}
      </span>
    )),
  },
  {
    title: 'Expanded',
    className: 'expanded',
    width: '5%',
    render: (text, row) => (row.expanded ? (
      <Icon
        type="folder-open"
        onClick={() => dispatch(
          row.method
            ? toggleMethodExpand({ key: row.id })
            : toggleActivityExpand({ key: row.id }),
        )
          }
      />
    ) : (
      <Icon
        type="folder"
        onClick={() => dispatch(
          row.method
            ? toggleMethodExpand({ key: row.id })
            : toggleActivityExpand({ key: row.id }),
        )
          }
      />
    )),
  },
];

const selectRow = (record, selectedRowKeys, setSelectedRowKeys, dispatch) => {
  if (selectedRowKeys.indexOf(record.id) >= 0) {
    selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    dispatch(deselectActivity({ key: record.id }));
  } else {
    selectedRowKeys.push(record.id);
    dispatch(selectActivity({ key: record.id }));
  }
  // console.log('selectedRowKeys', selectedRowKeys);
  setSelectedRowKeys(selectedRowKeys);
};

const onSelectedRowKeysChange = setSelectedRowKeys => (selectedRowKeys) => {
  setSelectedRowKeys(selectedRowKeys);
};

const state = withState('selectedRowKeys', 'setSelectedRowKeys', []);

const Activities = ({
  activities, selectedRowKeys, setSelectedRowKeys, dispatch, plan,
}) => (
  <Table
    rowSelection={
      plan
        ? {
          selectedRowKeys,
          // onSelect: record => selectRow(record, selectedRowKeys, setSelectedRowKeys, dispatch),
        }
        : null
    }
    rowKey="id"
    rowClassName={record => (record.method ? 'method' : 'activity')}
    columns={columns(dispatch)}
    dataSource={activities}
    pagination={false}
    locale={{ emptyText: '' }}
    onRow={record => ({
      onClick: () => {
        if (plan) {
          selectRow(record, selectedRowKeys, setSelectedRowKeys, dispatch);
        } else {
          dispatch(toggleActivityFocus({ key: record.id }));
        }
      },
    })}
  />
);

const Methods = ({
  methods, activities, selectedRowKeys, setSelectedRowKeys, dispatch, plan,
}) => (
  <Table
    className={plan ? 'table-plan' : 'table-browse'}
    columns={columns(dispatch)}
    pagination={false}
    rowKey="id"
    locale={{ emptyText: 'Please select a method on the left column.' }}
    // expandIcon={null}
    expandRowByClick
    expandedRowRender={({ id }) => (
      <Activities
        {...{
          activities, // : activities.filter(({ id_method }) => id_method === id),
          selectedRowKeys,
          setSelectedRowKeys,
          dispatch,
          plan,
        }}
      />
    )}
    onRow={record => ({
      onClick: () => {
        if (!plan) {
          dispatch(toggleMethodFocus({ key: record.id }));
        }
      },
    })}
    expandedRowKeys={methods.filter(({ selected }) => selected).map(({ id }) => id)}
    // defaultExpandAllRows
    dataSource={methods}
  />
);

export default compose(
  state,
  connect(({ methods, activities, global: { plan } }) => ({
    methods: Object.values(methods)
      .filter(({ selected }) => selected)
      .map(val => ({ ...val, method: true })),
    activities: Object.values(activities).filter(({ visible }) => visible),
    plan,
  })),
)(Methods);
