import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initSpinningFavicon } from './spinning-favicon.js';
const TWEEN = require('@tweenjs/tween.js')

const canvas = document.querySelector('#c');
let camera, scene, renderer, controls, tpose, speen = false;

// Initialize the spinning favicon with the dancer emoji
const spinningFavicon = initSpinningFavicon({
    character: '🕺',
    fontSize: 48,
    size: 64,
    autoRotationSpeed: 0 // Set to 0 for manual control only
});

let secrets = {
    joschagay: {count: 0, enable: rainbow_en, disable: rainbow_dis},
    minecraft: {count: 0, enable: mc_en, disable: mc_dis},
    amogus: {count: 0, enable: sus_en, disable: sus_dis},
    fart: {count: 0, enable: fart_en, disable: fart_dis}
}

let enabled_secret = null;

init();
requestAnimationFrame(animate);

function init() {
    renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x474747);
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.set(16, 11, 16);
    //camera.lookAt(new THREE.Vector3(0, 0, 0));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    const light = new THREE.AmbientLight(0x222222, 0.7); // soft white light
    scene.add(light);

    const dir_light = new THREE.DirectionalLight(0xffffff, 0.8);
    dir_light.position.set(10, 10, -2);
    scene.add(dir_light);

    function on_resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', on_resize);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    function on_click(e) {
        e.preventDefault();

        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObject(tpose, true);
        if (intersects.length > 0) {
            speen = !speen;
        }
    }

    function on_key_press(e) {
        for (let [str, dict] of Object.entries(secrets)) {
            if (e.key.toLowerCase() === str[dict.count]) {
                dict.count++;
                if (dict.count === str.length) {
                    dict.count = 0;

                    // disables previous secret if another one is triggered
                    if (![null, str].includes(enabled_secret)) {
                        secrets[enabled_secret].disable();
                        enabled_secret = null;
                    }

                    if (str !== enabled_secret) {
                        dict.enable();
                        enabled_secret = str;
                    } else {
                        dict.disable();
                        enabled_secret = null;
                    }

                    return;
                }
            } else {
                dict.count = 0;
            }
        }
    }

    const loader = new GLTFLoader();
    loader.load('assets/tpose.glb', function (gltf) {
        tpose = gltf.scene.children[0].children[0];
        scene.attach(tpose);
    }, undefined, function (error) {
        console.error(error);
    }
    );

    document.addEventListener('click', on_click);

    const mobile_keyboard = document.getElementById('mobile_keyboard');
    if ('ontouchstart' in document.documentElement) {
        mobile_keyboard.setAttribute('style', '');
        function on_mobile_keyb_input(e) {
            mobile_keyboard.value = 'open keyboard';
            on_key_press({key: e.data[e.data.length - 1]});
        }
        document.addEventListener('input', on_mobile_keyb_input);
    }
    document.addEventListener('keypress', on_key_press);
}

function animate(time) {
    requestAnimationFrame(animate);

    if (speen) {
        tpose.rotation.y += 0.1;
        // Sync favicon rotation with the 3D character
        spinningFavicon.setAutoRotationSpeed(0.1);
    } else {
        spinningFavicon.setAutoRotationSpeed(0);
    }

    TWEEN.update(time);

    controls.update();

    renderer.render(scene, camera);
}

function rainbow_en() {
    canvas.classList.add('rainbow');
    scene.background = null;
    speen = true;
}

function rainbow_dis() {
    scene.background = new THREE.Color(0x474747);
    canvas.classList.remove('rainbow');
    speen = false;
}

const mc_music_list = [1, 2, 3, 4];

// makes sure that the same tracks aren't played in succession
let mc_music;
let tmp_music_list;
function play_mc_music() {
    const rand_index = Math.floor(Math.random() * tmp_music_list.length);
    const rand_id = tmp_music_list[rand_index];
    mc_music = new Audio(`assets/music/menu${rand_id}.ogg`);
    tmp_music_list.splice(rand_index, 1);

    mc_music.addEventListener('canplaythrough', function(){
        mc_music.play();
    });

    mc_music.addEventListener('ended', function(){
        if (tmp_music_list.length === 0) {
            tmp_music_list = [...mc_music_list];
            tmp_music_list.splice(tmp_music_list.indexOf(rand_id), 1);
        }
        play_mc_music();
    })
}

function change_fov(fov, duration) {
    new TWEEN.Tween(camera)
        .to({fov}, duration)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(() => {
            camera.updateProjectionMatrix();
        })
        .start()
}

function mc_en() {
    scene.background = new THREE.CubeTextureLoader()
	    .setPath('assets/panorama/')
	    .load([
		    'px.png', 'nx.png',
		    'py.png', 'ny.png',
		    'pz.png', 'nz.png'
	    ]);

    change_fov(70, 500);

    tmp_music_list = [...mc_music_list];
    play_mc_music();
}

function mc_dis() {
    scene.background = new THREE.Color(0x474747);
    change_fov(30, 500);
    mc_music.pause();
}

let sus_plane, sus_vid, sus_music;

function sus_en() {
    tpose.visible = false;
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, transparent: true});

    sus_vid = document.createElement('video');
    sus_vid.setAttribute('autoplay', '');
    sus_vid.setAttribute('loop', '');
    sus_vid.setAttribute('src', 'assets/amogus/amogus.webm');
    material.map = new THREE.VideoTexture(sus_vid);

    sus_plane = new THREE.Mesh(geometry, material);
    sus_plane.lookAt(camera.position);
    scene.add(sus_plane);

    scene.background = new THREE.CubeTextureLoader()
	    .setPath('assets/amogus/')
	    .load([
		    '1.png', '2.png',
		    '3.png', '4.png',
		    '5.png', '6.png'
	    ]);
    
    change_fov(70, 500);

    sus_music = new Audio(`assets/amogus/amogus.opus`);
    sus_music.loop = true;
    sus_music.addEventListener('canplaythrough', function(){
        sus_music.play();
    });
}

function sus_dis() {
    scene.background = new THREE.Color(0x474747);
    scene.remove(sus_plane);
    sus_vid.remove();
    sus_music.pause();
    tpose.visible = true;
    change_fov(30, 500);
}

const fart_vid = document.getElementById('fart');

function fart_en() {
    fart_vid.setAttribute('src', 'assets/fart.webm');
    scene.background = null;
}

function fart_dis() {
    scene.background = new THREE.Color(0x474747);;
    fart_vid.pause();
}