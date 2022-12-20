import * as THREE from "three";

var matrix = new THREE.Matrix4();
matrix.elements = [
  -0.9533730218128975,
  -0.301794435467827,
  0.0,
  0.0,
  0.2894662413928369,
  -0.9144280769846415,
  -0.282896778200238,
  0.0,
  0.08537667347260791,
  -0.26970615629389394,
  0.9591503598935495,
  0.0,
  -1846750.113709537,
  5833910.5348689165,
  1792755.6775429507,
  1.0
];

var tMatrix = new THREE.Matrix4();

matrix.multiply(tMatrix.makeRotationX(0.5 * Math.PI));
//matrix.multiply(tMatrix.makeRotationZ(0.25 * Math.PI));
matrix.multiply(tMatrix.makeTranslation(0, 0, 0));

let result = "";
for (let i = 0; i < matrix.elements.length; i++) {
  result += matrix.elements[i] + ",";
  if ((i + 1) % 4 == 0) {
    console.log(result);
    result = "";
  }
}
