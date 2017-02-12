import React, {PropTypes} from 'react';
import functional from 'react-functional';

const ChildWrapper = ({children}) => {
  return React.Children.only(children);
};

const options = {
  propTypes: {
    children: PropTypes.object
  }
};

export default functional(ChildWrapper, options);
