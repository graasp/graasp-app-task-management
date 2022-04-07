import PropTypes from 'prop-types';

const taskDataProp = PropTypes.shape({
  title: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  completed: PropTypes.bool,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
});

export const taskProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  data: taskDataProp,
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
