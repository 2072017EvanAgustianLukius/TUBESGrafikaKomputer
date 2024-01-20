import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from '../node_modules/three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1);
const renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color(0xffffffff);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.setSize(window.innerWidth, window.innerHeight);
cam.position.x =2;
cam.position.y =2;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cam, renderer.domElement);

const loader = new GLTFLoader().setPath('../models/PS5/');
let consolps5;

loader.load('scene.gltf', (gltf) => {
    consolps5 = gltf.scene;
    consolps5.position.set(0, 0, 0);
    consolps5.scale.set(1, 1, 1);
    consolps5.rotation.x += 0;
    scene.add(consolps5);
    console.log(consolps5);
});

const colorPickerButtons = document.querySelectorAll('.color-picker-button');

colorPickerButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        if (consolps5) {
            const color = new THREE.Color(button.dataset.color);
            consolps5.traverse((child) => {
                if (child.isMesh) {
                    child.material.color = color;
                }
            });
        }
    });
});

const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 7, 5);
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 200, 100);
light2.position.set(0, 7, -5);
scene.add(light2);

function draw() {
    controls.update();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}

draw();
