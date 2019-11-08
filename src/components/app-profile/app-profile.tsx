import { Component, h, Listen } from '@stencil/core';

import { TestScene } from '../../services/game/scenes/test.scene';
import { SceneManager } from './../../services/engine/SceneManager';
import { Scene } from './../../services/engine/Scene';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
  containerEl: HTMLElement;
  scene: Scene;

  constructor() {

  }

  @Listen('vrdisplayconnect')
  vrdisplayconnect(event: CustomEvent) {

    console.log(event);

    if ( 'getVRDisplays' in navigator ) {
      // showEnterVR(event.detail.display);
    }

  }

  componentDidLoad() {

    // SceneManager.registerScene()

    var scene = new TestScene({
      attachEl: this.containerEl
    });

    SceneManager.registerScene('test', scene);
    SceneManager.setActiveScene('test');

    this.containerEl.appendChild(SceneManager.getRenderElement());

    /*this.scene.init({
      attachEl: this.containerEl
    });
    this.scene.animate();

    this.containerEl.appendChild(this.scene.renderer.domElement);

    if ( 'getVRDisplays' in navigator ) {

    }*/
  }

  enterVR(device, renderer) {
    device.isPresenting ? device.exitPresent() : device.requestPresent( [ { source: renderer.domElement } ] );

    renderer.vr.setDevice( device );
  }

  render() {
    return [
      <ion-content>
        <div ref={ (el: HTMLElement) => { this.containerEl = el; }} style={ { width: '100vw', height: '100vh'  } }></div>
      </ion-content>
    ];
  }
}
