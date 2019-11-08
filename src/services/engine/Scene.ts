import * as THREE from 'three';
import { WEBVR } from '../WebVR';

export class Scene  {
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;

    public screenWidth;
    public screenHeight;

    private activeCamera: THREE.Camera;

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

    /**
     * 
     * @param options 
     */
    private _init() {
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

        this.setup();

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.vr.enabled = true;

        this.attachEl.appendChild(WEBVR.createButton(this.renderer, {}));
    }

    private startRendering() {
        this.renderer.setAnimationLoop(() => {
            this.render();
        });
    }

    protected render() {
        this.renderer.render(this.scene, this.activeCamera);

        // Extend this in your scene instance
    }

    protected setup() {
        // Extend this in your scene instance
    }

    public init() {
        this._init();
    }

    public start() {
        this.startRendering();
    }

    public setActiveCamera(camera: THREE.Camera) {
        this.activeCamera = camera;
    }
}