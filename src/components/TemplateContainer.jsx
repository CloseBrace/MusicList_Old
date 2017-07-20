import React from 'react';
import { connect } from 'react-redux';
import Template from './Template';

function TemplateContainer(props) {
  return (
    <Template progress={props.progress} />
  );
}

function mapStateToProps(state) {
  return {
    progress: state.progress,
  };
}

export default connect(mapStateToProps)(TemplateContainer);
