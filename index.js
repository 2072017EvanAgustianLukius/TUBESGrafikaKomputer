import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color(0xaaaaaa);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);
cam.position.z = 5;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cam, renderer.domElement);

const loader = new GLTFLoader().setPath('../models/');
loader.load('Laptop_bag.gltf', (gltf) => {
    const laptop = gltf.scene;
    laptop.position.set(0, 0, 0);
    laptop.scale.set(100, 100, 100);
    scene.add(laptop);
    console.log(laptop);
});

const light = new THREE.PointLight(0xff0000, 2, 100);
light.position.set(-2, 2, 2);
scene.add(light);
scene.add(new THREE.PointLightHelper(light, 0.5, 0x00ff00));

function draw() {
    controls.update();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}

draw();
