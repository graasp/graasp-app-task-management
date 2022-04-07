import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isEditingDescription, setIsEditingDescription] = useState();
  const [isEditingTitle, setIsEditingTitle] = useState();

  const value = useMemo(
    () => ({
      isEditingDescription,
      setIsEditingDescription,
      isEditingTitle,
      setIsEditingTitle,
    }),
    [],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

AppProvider.defaultProps = {
  children: null,
};

export { AppContext, AppProvider };
