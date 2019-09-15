import { Component, State, Prop, h } from "@stencil/core";
import { Todo } from "../../interfaces/todo";
import { TodosService } from "../../services/todos";

@Component({
  tag: "app-detail",
  styleUrl: "app-detail.css"
})
export class AppDetail {
  public navCtrl = document.querySelector("ion-router");

  @Prop() id: string;

  @State() todo: Todo = {
    id: null,
    title: "",
    content: ""
  };

  async componentDidLoad() {
    await TodosService.load();
    this.todo = await TodosService.getTodo(this.id);
  }

  todoChanged(ev) {
    TodosService.updateTodo(this.todo, ev.target.value);
    TodosService.save();
  }

  deleteTodo() {
    setTimeout(() => {
      TodosService.deleteTodo(this.todo);
    }, 300);
    this.navCtrl.back();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/notes" />
          </ion-buttons>
          <ion-title>{this.todo.title}</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.deleteTodo()}>
              <ion-icon slot="icon-only" name="trash" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-textarea
          onInput={ev => this.todoChanged(ev)}
          value={this.todo.content}
          placeholder="...something on your mind?"
        />
      </ion-content>
    ];
  }
}