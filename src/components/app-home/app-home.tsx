import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  componentDidLoad() {

  }

  requestPermissions() {
    (DeviceMotionEvent as any).requestPermission().then((response) => {
      if (response == 'granted') {

      }
    }).catch(console.error)
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          Welcome to the Stencil & ThreejS VR ToolKit
        </p>

        <ion-button expand="block" onClick={ () => { this.requestPermissions() } }>Request Device Motion Permissions</ion-button>
        <ion-button href="/profile" expand="block">Start Demo</ion-button>
      </ion-content>
    ];
  }
}
