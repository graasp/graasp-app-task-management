import { PointerActivationConstraint } from '@dnd-kit/core';

const mouseActivationConstraint: PointerActivationConstraint = {
  delay: 250,
  tolerance: 5,
};

const touchActivationConstraint: PointerActivationConstraint = {
  delay: 250,
  tolerance: 20,
};

export { mouseActivationConstraint, touchActivationConstraint };
