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
renderer.toneMappingExposure = 0.8;
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.setSize(window.innerWidth, window.innerHeight);
cam.position.x = 0.3;
cam.position.y = 0.3;
cam.position.z = 0.3;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cam, renderer.domElement);

const loader = new GLTFLoader().setPath('../models/panasonic_sa-pm02_stereo_system/');
let consolps;

const loadingOverlay = document.getElementById('loading-overlay');

loader.load('scene.gltf', (gltf) => {
    consolps = gltf.scene;
    consolps.position.set(0, 0, 0);
    consolps.scale.set(1, 1, 1);
    consolps.rotation.x += 5.2;
    consolps.rotation.y += 1.3;
    consolps.rotation.z += 0.9;
    scene.add(consolps);
    console.log(consolps);

    // Sembunyikan animasi loading setelah objek 3D selesai dimuat
    loadingOverlay.style.display = 'none';
});


// loader.load('scene.gltf', (gltf) => {
//     const consolps = gltf.scene;
//     consolps.position.set(0, 0, 0);
//     consolps.scale.set(1, 1, 1);
//     consolps.rotation.x += 5.01;
//     consolps.rotation.y += 0.01;
//     consolps.rotation.z += 15;
//     scene.add(consolps);
//     console.log(consolps);
// });

// new RGBELoader()
// .load("../images/studio_small_09_2k.hdr", function(texture){
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = texture;
//     scene.environment = texture;
// });

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 5);
scene.add(hemiLight);

const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 7, 5);
scene.add(light);
// scene.add(new THREE.PointLightHelper(light, 0.5, 0x00ff00));

const light2 = new THREE.PointLight(0xffffff, 200, 100)
light2.position.set(0, 7, -5);
scene.add(light2);
// scene.add(new THREE.PointLightHelper(light2, 0.5, 0x00ff00));

function draw() {
    controls.update();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}

draw();
