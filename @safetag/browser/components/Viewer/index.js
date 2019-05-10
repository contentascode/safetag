import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withState, compose } from 'recompose';
import Expand from 'react-expand-animated';

import { Button } from 'antd';
import {
  toggleActivityFocus,
  toggleMethodFocus,
  toggleMethodExpand,
  toggleActivityExpand,
} from '../../store';

// import Markdown from 'react-markdown-renderer';

// const htmlContent = require('../../static/content/methods/reconnaissance.html');

class Expandable extends React.Component {
  constructor(props) {
    super(props);
    this.section = React.createRef();
  }

  componentDidMount() {
    // console.log(this.section.current);
    // this.section.current.scrollIntoView();
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.focused !== newProps.focused) {
      this.section.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // this.setState({ ...something based on newProps.field... })
    }
  }

  render() {
    const {
      id, expanded, html, method, dispatch,
    } = this.props;

    return (
      <Expand
        open={expanded}
        styles={{
          open: {
            height: 'auto',
            opacity: 1,
            position: 'relative',
            borderBottom: '1px solid #ddd',
          },
          close: {
            height: 200,
            opacity: 1,
            position: 'relative',
            borderBottom: '1px solid #ddd',
          },
        }}
      >
        <div
          ref={this.section}
          style={{
            color: 'black',
            zIndex: -1,
            padding: '10px 0px',
            backgroundColor: method ? '#fafaff' : '#fff',
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div
          style={{
            content: '',
            display: expanded ? 'none' : 'block',
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 100,
            width: '100%',
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 1) 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 15,
            right: 0,
            height: 40,
          }}
        >
          <Button
            onClick={() => dispatch(method ? toggleMethodExpand({ key: id }) : toggleActivityExpand({ key: id }))
            }
          >
            {expanded ? 'Close' : 'Open'}
          </Button>
        </div>
      </Expand>
    );
  }
}

// const Viewer = ({ content = 'document_matter/audit_lifecycle.html' /* 'index.html' */ }) => {
export const Viewer = ({
  methods, activities, plan, dispatch,
}) => {
  const view = methods.map(({
    id, content, expanded, focused,
  }) => {
    const header_html = require(`../../static/content/${content}.html`);
    const header = (
      <Expandable
        {...{
          key: `m-${id}`,
          id,
          expanded,
          focused,
          html: header_html,
          method: true,
          dispatch,
        }}
      />
    );

    const list = activities
      .filter(({ id_method }) => id_method === id)
      .map(({
        id, content, expanded, focused,
      }) => {
        // const url = ;
        const html = require(`../../static/content/${content}.html`);
        return (
          <Expandable
            {...{
              key: `a-${id}`,
              id,
              expanded,
              focused,
              html,
              dispatch,
            }}
          />
        );
      });

    return (
      <Fragment key={id}>
        {header}
        {list}
        <div style={{ height: '80%' }} />
      </Fragment>
    );
  });
  return view;
};

export default compose(
  connect(({ methods, activities, global: { plan } }) => ({
    methods: Object.values(methods).filter(({ selected }) => selected),
    activities: Object.values(activities).filter(({ selected }) => selected),
    plan,
  })),
)(Viewer);
