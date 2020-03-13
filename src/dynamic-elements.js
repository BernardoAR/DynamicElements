/**
 * Nova classe para os elementos dinâmicos
 * @author Bernardo Alves Roballo
 * @version 1.0
 */
export class DynamicElements {
  /**
   * Construtor com o básico necessário para a criação de um elemento dinâmico
   * @param {string} botao - Nome do botão que será utilizado para a ação de criar elemento
   * @param {string} nome - Nome utilizado para o input, utilizado como post
   * - Exemplo: nome = teste
   * - <input id="teste[]">
   * @param {string} div - Nome do container onde será colocado os elementos
   */
  constructor(botao, nome, div) {
    this.botao = botao;
    this.nome = nome;
    this.div = div;
    // Índice utilizado para conseguir colocar uma atribuição de manipulação mais fácil
    this.indice = 0;
    // Variável utilizada para saber como será a ordem do elemento: {ordem: elemento}
    this.ordem = {};
    // Colocando os métodos para ouvir certas ações
    this._onClickButton(); // Clique do botao de adicionar
    this._removeElementAction(); // Ação de remover
  }
  /**
   * Método utilizado para o onclick do botão de add
   */
  _onClickButton() {
    const button = document.getElementById(this.botao);
    button.addEventListener('click', event => this.createElements(event));
  }
  /**
   * Método utilizado para a ação de remoção
   * @param {element} button
   */
  _removeElementAction() {
    // Adiciona um listener de remoção de elemento dinâmico
    document.addEventListener('click', e => {
      let target = e.target;
      if (target.closest('.remove')) {
        target.closest('.divelement').remove();
      }
    });
  }
  /**
   * Método utilizado para criar uma label de texto de descrição
   * @param {String} labelText
   */
  _label(labelText = '') {
    const label = document.createElement('label');
    label.innerHTML = labelText;
    return label;
  }
  /**
   * Método utilizado para criar uma div de Row
   */
  _divRow() {
    const divRow = document.createElement('div');
    divRow.setAttribute('class', 'divelement');
    return divRow;
  }
  /**
   * Método utilizado para fazer o append no div da row
   * @param {object} label
   * @param {object} divInput
   * @param {object} btnRemove
   */
  _divRowAppend(label, divInput, btnRemove) {
    const divRow = this._divRow();
    divRow.append(label);
    divRow.append(divInput);
    divRow.append(btnRemove);
    return divRow;
  }
  /**
   * Método utilizado para criar uma div de Input
   */
  _divInput() {
    const divInput = document.createElement('div');
    return divInput;
  }
  /**
   * Método utilizado para dar append do input na div de input
   * @param {object} input
   */
  _divInputAppend(input) {
    const divInput = this._divInput();
    divInput.appendChild(input);
    return divInput;
  }
  /**
   * Método utilizado para criar um botão de remover
   */
  _buttonRemove() {
    const btnRemove = document.createElement('a');
    const iconRemove = document.createElement('i');
    btnRemove.setAttribute('class', 'remove');
    btnRemove.appendChild(iconRemove);
    return btnRemove;
  }
  /**
   * Método utilizado para adicionar um elemento de arquivo
   * @param {method} onChange
   */
  _file(onChange) {
    const file = document.createElement('input');
    file.setAttribute('type', 'file');
    file.setAttribute('id', `${this.nome}[]`);
    file.addEventListener('change', onChange);
    return file;
  }
  /**
   * Método utilizado para adicionar um elemento de texto
   * @param {method} onChange
   */
  _text(onChange) {
    const text = document.createElement('input');
    text.setAttribute('type', 'text');
    text.setAttribute('id', `${this.nome}[]`);
    text.addEventListener('change', onChange);
    return text;
  }
  /**
   * Método utilizado para adicionar um elemento de select
   * @param {method} onChange
   */
  _dropdown(onChange) {
    const dropdown = document.createElement('select');
    dropdown.setAttribute('type', 'select');
    dropdown.setAttribute('id', `${this.nome}[]`);
    dropdown.addEventListener('change', onChange);
    return dropdown;
  }
  /**
   * Método utilizado para adicionar os valores do dropdown
   * @param {object} dropown
   * @param {array} values
   */
  _addDropdownValues(dropown, values) {
    for (let value in values) {
      let opt = document.createElement('option');
      opt.appendChild(document.createTextNode(values[value].titulo));
      opt.value = values[value].id;
      dropown.appendChild(opt);
    }
  }
  /**
   *  Método utilizado para colocar o dropdown adicionando os seus respectivos valores
   * @param {method} onChange
   * @param {array} values
   */
  _dropdownAdd(onChange, values) {
    const dropdown = this._dropdown(onChange);
    this._addDropdownValues(dropdown, values);
    return dropdown;
  }
  /**
   *
   * @param {string} inputName - Nome da entrada
   * @param {object} optional - {onChange, values}
   */
  _chooseInput(inputName, optional) {
    switch (inputName) {
      case 'file':
        return this._file(optional.onChange);
      case 'text':
        return this._text(optional.onChange);
      case 'dropdown':
        return this._dropdownAdd(optional.onChange, optional.values);
    }
  }
  /**
   * Adiciona um elemento para a lista de elementos para a ordem do dynamic
   * @param {object} param
   * @param {string} param.labelText
   * @param {string} param.inputName
   * @param {method} param.onChange
   * @param {int} param.ordem
   * @param {array} param.values
   */
  addElement({ labelText, inputName, onChange, ordem, values }) {
    const label = this._label(labelText);
    const btnRemove = this._buttonRemove();
    const input = this._chooseInput(inputName, {
      onChange: onChange,
      values: values
    });
    const divInput = this._divInputAppend(input); // Append Input
    const divRow = this._divRowAppend(label, divInput, btnRemove); // Append na Row
    this.ordem[ordem] = divRow;
  }
  /**
   * Cria os elementos colocados
   */
  createElements() {
    const globalDiv = document.getElementById(this.div);
    for (let element in this.ordem) {
      globalDiv.appendChild(this.ordem[element].cloneNode(true));
    }
  }
}
