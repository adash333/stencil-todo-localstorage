import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/todos" component="app-home" />
          <ion-route url="/todos/:id" component="app-detail" />
        </ion-router>
        <ion-alert-controller />
        <ion-nav />
      </ion-app>
    );
  }
}
