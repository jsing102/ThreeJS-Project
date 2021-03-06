import './style.css'
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;


  const color = 0xFFFFFF;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  renderer.render(scene, camera);

  const loader = new FontLoader();
  loader.load();

  // add torus
  const ring = new THREE.TorusGeometry(5, 1, 16, 100);
  // const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.5 });
  const ringMaterial = new THREE.MeshPhongMaterial({
    color: 0xf0f0f0
  })
  const torus = new THREE.Mesh(ring, ringMaterial);
  scene.add(torus);

  // add cube?

  const near = 30;
  const far = 100;
  scene.fog = new THREE.Fog(color, near, far);


  // directional light
  const light = new THREE.DirectionalLight(0xfaa1f3, 1);
  light.position.set(0, 0, 1);
  scene.add(light);

  // directional light 2, uncomment if needed
  /*
  const light2 = new THREE.DirectionalLight(0x1b1bbb, 1); 
  light2.position.set(20, 20, 1);
  scene.add(light2);
  */



  //ambient light
  const ambientLight = new THREE.AmbientLight(color, 0.8);
  scene.add(ambientLight);

  // Uncomment to add a grid to the scene:
  /*
  const grid = new THREE.GridHelper(200, 50);
  scene.add(grid);
  */
  // Controls the scene
  //const controls = new OrbitControls(camera, renderer.domElement);
  //controls.enableDamping = true;
  //controls.dampingFactor = 0.25;
  //controls.enableZoom = true;
  //controls.enablePan = true;

  //Adds a "star"
  const starAmount = 500;

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffff
    });

    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));

    star.position.set(x, y, z);
    scene.add(star);
  }
  // Adds "starAmount" of Stars
  Array(starAmount).fill().forEach(addStar);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  ring.rotation.x += 0.05;
  ring.rotation.y += 0.075;
  ring.rotation.z += 0.05;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x = 0.01;
  torus.rotation.y = 0.005;
  torus.rotation.z = 0.01;

  renderer.render(scene, camera);

}
animate();