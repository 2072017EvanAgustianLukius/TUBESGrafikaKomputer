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
cam.position.z = 10;
cam.position.y = 5;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cam, renderer.domElement);

const loader = new GLTFLoader().setPath('../models/dualsense/');
let dualps5;

// loader.load('scene.gltf', (gltf) => {
//     dualps5 = gltf.scene;
//     dualps5.position.set(0, 4, 0);
//     dualps5.scale.set(1, 1, 1);
//     dualps5.rotation.x += 1;
//     scene.add(dualps5);
//     console.log(dualps5);
// });

// ... (bagian JS sebelumnya tetap sama)

// Tambahkan kode untuk menangani animasi loading
const loadingOverlay = document.getElementById('loading-overlay');

loader.load('scene.gltf', (gltf) => {
    dualps5 = gltf.scene;
    dualps5.position.set(0, 4, 0);
    dualps5.scale.set(1, 1, 1);
    dualps5.rotation.x += 0.01;
    scene.add(dualps5);
    console.log(dualps5);

    // Sembunyikan animasi loading setelah objek 3D selesai dimuat
    loadingOverlay.style.display = 'none';
});

// ... (bagian JS selanjutnya tetap sama)



const colorPickerButtons = document.querySelectorAll('.color-picker-button');

colorPickerButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        if (dualps5) {
            const color = new THREE.Color(button.dataset.color);
            dualps5.traverse((child) => {
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
