import { Component, h, State, Event, EventEmitter, Listen, Watch } from '@stencil/core';

@Component({
  tag: 'app-todo',
  styleUrl: 'app-todo.css',
  shadow: true,
})
export class AppCard {
  // Minhas tarefas
  @State()
  tarefas: Array<{ feito: boolean; descricao: string }> = [];
  // bind do campo input
  @State()
  input: string = '';
  // Emitter do total de tarefas
  @Event()
  emitTotal: EventEmitter;
  // Escuta o evento de keydown do teclado
  @Listen('keydown') watchKeyPress(event) {
    console.log(event.keyCode);
  }
  // Escuta o evento 'enter' e executa a função salvar
  @Listen('keydown') isKeyPressEnter(event) {
    if (event.keyCode === 13) {
      this.save();
    }
  }
  @State() validate: string = 'success';
  @Watch('input') validateInput(newValue, _oldValue) {
    if (newValue.length < 50) this.validate = 'success';
    else if (newValue.length >= 50 && newValue.length < 90) this.validate = 'warning';
    else this.validate = 'danger';
  }

  // Altera o valor do input
  alterInput = event => (this.input = event.target.value);

  // Salva nova tarefa
  save() {
    if (this?.input && this.input.trim() != '') {
      this.tarefas = [...this.tarefas, { descricao: this.input.trim(), feito: false }];
      this.input = '';
    }
  }

  // Emite o numero de tarefas cadastradas
  totalRegisters = () => this.emitTotal.emit(this.tarefas.length);

  // Marca uma tarefa como concluída
  taskCompleted = index => {
    this.tarefas[index].feito = !this.tarefas[index].feito;
    this.tarefas = [...this.tarefas];
  };

  // Excluir uma tarefa do array de tarefas
  taskRemoved = index => {
    this.tarefas.splice(index, 1);
    this.tarefas = [...this.tarefas];
  };

  render() {
    return (
      <div class="todo">
        <h2 class="titulo">TODO list</h2>
        <div class="input">
          <div>
            <label class="input--descricao">Nova tarefa</label>
            <input type="text" class={`${this.validate} input--campo`} maxlength="100" value={this.input} onInput={(event: UIEvent) => this.alterInput(event)} />
          </div>
          <button class="input--botao" onClick={() => this.save()}>
            Adicionar
          </button>
        </div>
        <div class="lista">
          {this.tarefas.length > 0 ? (
            [
              this.tarefas.map((tarefa, index) => (
                <div class="tarefa">
                  <div>
                    <input type="checkbox" class="tarefa--alterar" onChange={() => this.taskCompleted(index)} />
                    <label class={`${tarefa.feito ? 'completed' : ''} tarefa--descricao`}>{tarefa.descricao}</label>
                  </div>
                  <button class="tarefa--excluir" onClick={() => this.taskRemoved(index)}>
                    Excluir
                  </button>
                </div>
              )),
              <br />,
              <button onClick={() => this.totalRegisters()}>Total</button>,
            ]
          ) : (
            <h2 class="lista--vazia">Você não possui tarefas!</h2>
          )}
        </div>
      </div>
    );
  }
}
