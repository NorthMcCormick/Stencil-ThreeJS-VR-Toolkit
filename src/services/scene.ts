import * as THREE from 'three';
import { WEBVR } from '../services/WebVR';

export class Scene  {
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;
    public camera: THREE.Camera;
    public light: THREE.HemisphereLight;

    public screenWidth;
    public screenHeight;

    constructor() {

    }

    init(options: any) {
        let _screenWidth = window.innerWidth;
        let _screenHeight = window.innerHeight;

        if (_screenWidth > _screenHeight) {
            this.screenWidth = _screenWidth;
            this.screenHeight = _screenHeight;
        } else {
            this.screenWidth = _screenHeight;
            this.screenHeight = _screenWidth;
        }

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x505050);

        this.camera = new THREE.PerspectiveCamera(70, this.screenWidth / this.screenHeight, 0.1, 10);

        this.scene.add(this.camera);


        this.light = new THREE.HemisphereLight(0xffffff, 0x444444);
        this.light.position.set(1, 1, 1);
        this.scene.add(this.light);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.vr.enabled = true;

        options.attachEl.appendChild(WEBVR.createButton(this.renderer, {}));
    }

    animate() {
        this.renderer.setAnimationLoop(() => {
            this.render();
        });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}