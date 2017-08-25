import React from 'react';
import { connect } from 'react-redux';
import Template from './Template';

function TemplateContainer(props) {
  const { authentication, progress } = props;
  return (
    <Template progress={progress} authentication={authentication} />
  );
}

function mapStateToProps(state) {
  return {
    progress: state.progress,
    authentication: state.authentication,
  };
}

export default connect(mapStateToProps)(TemplateContainer);
