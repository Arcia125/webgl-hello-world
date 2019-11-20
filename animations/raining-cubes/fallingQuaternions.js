import { Quaternion, Euler } from 'three';

export const fallingQuaternions = [
  new Quaternion().setFromEuler(new Euler(0.041, 0.065, 0.075)),
  new Quaternion().setFromEuler(new Euler(-0.055, 0.0278, 0.05)),
  new Quaternion().setFromEuler(new Euler(0.025, -0.0478, 0.05)),
  new Quaternion().setFromEuler(new Euler(0.025, 0.0478, -0.089)),
];
