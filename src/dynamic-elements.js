/**
 * Nova classe para os elementos dinâmicos
 * @author Bernardo Alves Roballo
 * @version 1.0
 */
function dynamicElements(button, name, div) {
  let elements = [];
  let buttonAdd = false;
  let buttonRemove = false;
  let order = 0;
  /**
   * Adiciona um elemento para a lista de elementos para a ordem do dynamic
   * @param {Array[json]} array
   *
   @param {object} param
   @param {string} param.labelText
   @param {string} param.inputName
   @param {method} param.onChange
   @param {int} param.ordem
   @param {array} param.values
   */
  function addElements(array) {
    if (!buttonAdd) _onClickButton();
    if (!buttonRemove) _onClickRemoveElement();
    if (array.constructor === Array) {
      for (let i in array) {
        let div = _createElement(array[i]);
        let pos = array[i].input.order ?? order++;
        elements[pos] = div;
      }
    } else {
      throw "The type isn't array";
    }
  }
  /**
   * onClick to create elements
   */
  function _onClickButton() {
    document
      .getElementById(button)
      .addEventListener('click', (event) => _createElements(event));
  }
  /**
   * Método utilizado para a ação de remoção
   * @param {element} button
   */
  function _onClickRemoveElement() {
    // Adiciona um listener de remoção de elemento dinâmico
    document.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.remove-de')) {
        target.closest('.div-element-de').remove();
      }
    });
  }
  function addValues(array) {
    for (let i in array) {
      _createElements(array[i]);
    }
  }
  /**
   * Método utilizado para adicionar um elemento de texto
   * @param {method} onChange
   */
  function _createElement(json) {
    const input = _input(json.input);
    const div = document.createElement('div');
    if (json.input.values) _addSelectValues(input, json.input.values);
    typeof json.label == 'undefined'
      ? div.append(input)
      : div.append(_label(json.label), input);
    return div;
  }
  /**
   * Método utilizado para criar uma label de texto de descrição
   * @param {String} labelText
   */
  function _label(json) {
    const label = document.createElement('label');
    label.innerHTML = json.text;
    label.setAttribute('class', json.classes ?? '');
    return label;
  }
  function _input(json) {
    const input = document.createElement(
      json.type == 'select' ? 'select' : 'input'
    );
    input.setAttribute('type', json.type);
    input.setAttribute('name', `${name}[${json.inputName}][]`);
    input.setAttribute('class', json.classes ?? '');
    input.setAttribute('onchange', json.onChange ?? '');
    if (typeof json.value !== 'undefined') input.value = json.value;
    return input;
  }
  /**
   * Método utilizado para criar um botão de remover
   */
  function _buttonRemove() {
    const btnRemove = document.createElement('a');
    btnRemove.setAttribute('class', 'remove-de');
    btnRemove.innerHTML = 'Remove';
    return btnRemove;
  }
  function _divRow() {
    const divRow = document.createElement('div');
    divRow.setAttribute('class', 'div-element-de');
    return divRow;
  }
  /**
   * Método utilizado para adicionar os valores do dropdown
   * @param {object} select
   * @param {array} values
   */
  function _addSelectValues(select, values) {
    for (let i in values) {
      let opt = document.createElement('option');
      opt.appendChild(document.createTextNode(values[i].title));
      opt.value = values[i].id;
      select.appendChild(opt);
    }
  }
  /**
   * Cria os elementos colocados
   */
  function _createElements(array) {
    const globalDiv = document.getElementById(div);
    const divRow = _divRow();
    for (let element in elements) {
      let clone = elements[element].cloneNode(true);
      if (clone.children[0].localName == 'label') {
        clone.children[0].innerHTML =
          array[element]?.labelText ?? clone.children[0].innerHTML;
        clone.children[1].value = array[element]?.value ?? '';
      } else {
        console.log(clone.children[0].value);
        clone.children[0].value =
          array[element]?.value ?? clone.children[0].value;
      }
      divRow.append(clone);
    }
    divRow.append(_buttonRemove());
    globalDiv.append(divRow);
  }
  return { addElements, addValues };
}
export default dynamicElements;
