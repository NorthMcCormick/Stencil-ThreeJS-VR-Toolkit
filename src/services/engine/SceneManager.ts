import { Scene } from './Scene';

export class SceneManager {
    private static scenes: {
        [key: string]: Scene
    } = {};

    private static currentScene: Scene;

    public static registerScene(id: string, sceneToRegister: Scene) {
        if (id && sceneToRegister) {
            if (!this.scenes[id]) {
                this.scenes[id] = sceneToRegister;

                if (!this.currentScene) {
                    this.currentScene = this.scenes[id];
                }
            }
        }
    }

    public static setActiveScene(id: string) {
        if (id) {
            if (this.scenes[id]) {
                // TODO: Destroy old scene or something
                this.currentScene = this.scenes[id];
                this.currentScene.init();
                this.currentScene.animate();
            }
        }
    }

    public static getRenderElement() {
        if (this.currentScene) {
            return this.currentScene.renderer.domElement;
        }
    }
}