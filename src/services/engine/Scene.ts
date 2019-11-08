import * as THREE from 'three';
import { WEBVR } from '../WebVR';

export class Scene  {
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;
    public light: THREE.HemisphereLight;

    public screenWidth;
    public screenHeight;

    private attachEl: HTMLElement;

    /**
     * 
     * @param options {
      attachEl: this.containerEl
    }
     */
    constructor(options: any) {
        this.attachEl = options.attachEl ? options.attachEl : document.body;
    }

    public init() {
        this._init();
    }

    /**
     * 
     * @param options 
     */
    _init() {
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


        this.light = new THREE.HemisphereLight(0xffffff, 0x444444);
        this.light.position.set(1, 1, 1);
        this.scene.add(this.light);
        // 

        this.setup();

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.vr.enabled = true;

        this.attachEl.appendChild(WEBVR.createButton(this.renderer, {}));
    }

    animate() {
        this.renderer.setAnimationLoop(() => {
            this.render();
        });
    }

    _render(camera: THREE.Camera) {
        this.renderer.render(this.scene, camera);
    }

    render() {
        // Override this in your scene instance
    }

    protected setup() {
        // Override this in your scene instance
    }
}