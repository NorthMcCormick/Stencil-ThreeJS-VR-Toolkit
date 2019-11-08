import * as THREE from 'three';

import { BoxLineGeometry } from '../../engine/jsm/geometries/BoxLineGeometry';
import { Scene } from '../../engine/Scene';


export class TestScene extends Scene {
    public camera: THREE.Camera;

    setup() {
        console.log('Test scene set up');

        // 
        this.camera = new THREE.PerspectiveCamera(70, this.screenWidth / this.screenHeight, 0.1, 10);

        this.scene.add(this.camera);

        var room = new THREE.LineSegments(
            new BoxLineGeometry(6, 6, 6, 10, 10, 10),
            new THREE.LineBasicMaterial({ color: 0x808080 })
        );
        
        room.geometry.translate(0, 3, 0);
        
        this.scene.add(room);
    }

    render() {
        this._render(this.camera);
    }
}