import { Component, h, Listen, Method, Element } from '@stencil/core';

@Component({
  tag: 'todo-container',
  styleUrl: 'todo-container.css',
  shadow: true,
})
export class TodoComponent {
  @Listen('emitTotal') alertInfoTotal(event: CustomEvent) {
    console.log(event.detail);
    alert(`Total de ${event.detail} tarefas(s)!`);
  }

  // Export um metodo do componente para a API publica
  @Method() greeting() {
    alert('Bem vindo ao TODO list');
    console.log(this.currentComponent);
  }

  // Utilizado para substituir o querySelector
  @Element() currentComponent: HTMLElement;
  render() {
    return <app-todo></app-todo>;
  }
}
