import { Component, h } from '@stencil/core';

import { Scene } from '../../services/scene';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
  containerEl: HTMLElement;
  scene: Scene;

  constructor() {

  }

  componentDidLoad() {
    this.scene = new Scene();
    this.scene.init();
    this.scene.animate();

    this.containerEl.appendChild(this.scene.renderer.domElement);
  }

  render() {
    return [
      <ion-content>
        <div ref={ (el: HTMLElement) => { this.containerEl = el; }}></div>
      </ion-content>
    ];
  }
}
