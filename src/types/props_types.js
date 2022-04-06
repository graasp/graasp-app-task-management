import PropTypes from 'prop-types';

export const taskProp = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
    completed: PropTypes.bool,
  });

const listInItemsListProp = PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(taskProp),
  });
export const itemsListProp = PropTypes.shape({
    todo: listInItemsListProp,
    inProgress: listInItemsListProp,
    completed: listInItemsListProp,
  });