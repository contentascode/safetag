import { connect } from 'react-redux';

import { Layout } from 'antd';

import Methods from '../components/Methods';
import Activities from '../components/Activities';
import Viewer from '../components/Viewer';

const { Content, Sider } = Layout;

const Index = ({ custom, selectedMethods }) => (
  <Layout>
    <Layout style={{ padding: '8px' }}>
      <Sider
        theme="light"
        width={280}
        style={{
          overflow: 'scroll',
          height: 'calc(100vh - 16px)',
          paddingTop: 8,
          // position: 'fixed',
          left: 0,
        }}
      >
        <Methods />
      </Sider>
      <Layout style={{ paddingLeft: '8px' }}>
        <Sider
          theme="light"
          width="40%"
          style={{
            overflow: 'scroll',
            height: 'calc(100vh - 16px)',
            // padding: '0 24px 24px',
          }}
        >
          <Activities selectedMethods={selectedMethods} />
        </Sider>
        <Layout width="50%" style={{ padding: '0 0px 0px 8px' }}>
          <Content
            style={{
              overflow: 'scroll',
              height: 'calc(100vh - 16px)',
              background: '#fff',
              padding: 16,
              margin: 0,
              // minHeight: 280,
            }}
          >
            <Viewer />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Layout>
);

Index.getInitialProps = ({ pathname, query }) => ({
  custom: 'custom', // pass some custom props to component
});

export default connect()(Index);
