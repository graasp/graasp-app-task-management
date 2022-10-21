import { PointerActivationConstraint } from '@dnd-kit/core';

const mouseActivationConstraint: PointerActivationConstraint = {
  delay: 10,
  tolerance: 5,
};

const touchActivationConstraint: PointerActivationConstraint = {
  delay: 150,
  tolerance: 20,
};

export { mouseActivationConstraint, touchActivationConstraint };
