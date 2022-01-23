import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
// instanstiate loader, and use over and over again
const loader = new THREE.TextureLoader();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const ring = new THREE.TorusGeometry(5, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.5 });
const torus = new THREE.Mesh(ring, material);
scene.add(torus);

// directional light
const light = new THREE.DirectionalLight(0xfaa1ff, 1); 
light.position.set(0, 0, 1);
scene.add(light);

// directional light
const light2 = new THREE.DirectionalLight(0x00ff, 1); 
light2.position.set(20, 20, 1);
scene.add(light2);


//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

/*const grid = new THREE.GridHelper(200, 50);
scene.add(grid);
*/
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enablePan = true;


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}



animate();