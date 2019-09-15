import { Component, State, h } from '@stencil/core';
import { Todo } from "../../interfaces/todo";
import { TodosService } from "../../services/todos";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @State() todos: Todo[] = [];
  public navCtrl = document.querySelector("ion-router");

  async componentDidLoad() {
    //this.todos = await TodosService.load();
    this.todos = [...(await TodosService.load())];
  }

  async addTodo() {
    const alertCtrl = document.querySelector("ion-alert-controller");

    let alert = await alertCtrl.create({
      header: "New Todo",
      message: "What should the title of this todo be?",
      inputs: [
        {
          type: "text",
          name: "title"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: async data => {
            TodosService.createTodo(data.title);
            this.todos = [...(await TodosService.load())];
          }
        }
      ]
    });

    alert.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Stencil Todo localStorage</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.addTodo()}>
              <ion-icon slot="icon-only" name="add-circle" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-list>
          {this.todos.map(todo => (
            <ion-item button detail href={`/todos/${todo.id}`} routerDirection="forward">
              <ion-label>{todo.title}</ion-label>
            </ion-item>
          ))}
        </ion-list>
      </ion-content>
    ];
  }
}
