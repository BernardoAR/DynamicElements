'use strict';
/**
 * Nova classe para os elementos dinâmicos
 * @author Bernardo Alves Roballo
 * @version 1.0
 */
function dynamicElements(button, div) {
  let dynamicValues = { button: button, div: div };
  let haveDynamicBtn = false;
  let config = { btnRemove: undefined, divRow: undefined };
  let jsonValues = [];
  let elements = [];
  let buttonAdd = false;
  let buttonRemove = false;
  let order = 0;
  function configuration(json) {
    config.btnRemove = json.btnRemove;
    config.divRow = json.divRow;
  }
  function addElements(array) {
    if (!buttonAdd) _onClickButton();
    if (!buttonRemove) _onClickRemoveElement();
    if (array.constructor === Array) {
      for (let i in array) {
        let div = _createElement(array[i]);
        let pos = array[i].input.order ?? order++;
        elements[pos] = div;
        jsonValues[pos] = array[i];
      }
    } else {
      throw "The type isn't array";
    }
  }
  /**
   * onClick to create elements
   */
  function _onClickButton() {
    document.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest(`.${dynamicValues.button}`)) {
        _createElements(null, target);
      }
    });
  }

  function _onClickRemoveElement() {
    // Adiciona um listener de remoção de elemento dinâmico
    document.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.remove-de')) {
        target.closest('.div-element-de').remove();
      }
    });
  }
  function addValues(array, target = null) {
    for (let i in array) {
      _createElements(array[i], target);
    }
  }

  function _createElement(json) {
    let input;
    switch (json.input.type) {
      case 'dynamic':
        input = _dynamic(json.input.dynamic, json.input);
        break;
      default:
        input = _input(json.input);
    }
    const div = document.createElement('div');
    if (typeof json.div != 'undefined')
      div.setAttribute('class', `${json.div.classes}`);
    if (json.input.values) _addSelectValues(input, json.input.values);
    typeof json.label == 'undefined'
      ? div.append(input)
      : div.append(_label(json.label), input);
    return div;
  }
  function _dynamic(dynamic, json) {
    haveDynamicBtn = true;
    const div = document.createElement('div');
    div.setAttribute('class', `${'container' + (json.class ?? '')}`);
    const divAdd = document.createElement('div');
    divAdd.classList.add(dynamic.dynamicValues.div);
    const button = document.createElement('a');
    button.setAttribute(
      'class',
      `${dynamic.dynamicValues.button} ${
        json.button.classes ?? ''
      } dynamic-button`
    );
    button.classList.add(dynamic.dynamicValues.button);
    if (typeof json.button.value !== 'undefined')
      button.innerHTML = json.button.value;
    div.append(divAdd, button);
    return div;
  }

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
    input.setAttribute('name', `${json.inputName}`);
    input.setAttribute('class', json.classes ?? '');
    input.setAttribute('onchange', json.onChange ?? '');
    if (typeof json.value !== 'undefined') input.value = json.value;
    return input;
  }

  function _buttonRemove() {
    const btnRemove = document.createElement('a');
    btnRemove.setAttribute(
      'class',
      `remove-de ${config.btnRemove?.classes ?? ''}`
    );
    btnRemove.innerHTML = config.btnRemove?.name ?? 'Remove';
    return btnRemove;
  }
  function _div(classe) {
    const div = document.createElement('div');
    div.setAttribute('class', `${classe}`);
    return div;
  }

  function _addSelectValues(select, values) {
    for (let i in values) {
      let opt = document.createElement('option');
      opt.appendChild(document.createTextNode(values[i].title));
      opt.value = values[i].id;
      select.appendChild(opt);
    }
  }
  function _getParentUntil(classe, target) {
    // Pega dois elements, para caso o queryselector tenha mais de um, ver a classe do anterior
    let element = target;
    let oldelement = target;
    while (element.querySelector(`.${classe}`) == null) {
      oldelement = element;
      element = element.parentElement;
    }
    return oldelement.classList.contains(classe)
      ? oldelement
      : element.querySelector(`.${classe}`);
  }
  /**
   * Cria os elementos colocados
   */
  function _createElements(array, target = null) {
    let dynamicName = null;
    if (target?.parentElement != (null && undefined)) {
      if (
        target
          .closest(`.${dynamicValues.button}`)
          .classList.contains('dynamic-button')
      ) {
        console.log('Antes Target');
        dynamicName = _getParentUntil('dynamic-div', target).querySelector(
          '.global-name'
        ).value;
        console.log(_getParentUntil('dynamic-div', target));
      }
    }

    const globalDiv =
      target == null
        ? document.querySelector(`.${div}`)
        : _getParentUntil(div, target);
    const divRow = _div(
      `div-element-de ${config.divRow?.classes ?? ''} ${
        haveDynamicBtn ? 'dynamic-div' : ''
      }`
    );
    for (let element in elements) {
      let clone = elements[element].cloneNode(true);
      switch (clone.children[0].localName) {
        case 'div':
          if (array != null) {
            jsonValues[element].input.dynamic.addValues(
              array[element]?.value,
              clone
            );
          }
          break;
        case 'label':
          clone.children[0].innerHTML =
            array != null
              ? array[element]?.labelText ?? clone.children[0].innerHTML
              : clone.children[0].innerHTML;
          clone.children[1].name =
            (dynamicName ?? '') +
            (array != null
              ? array[element]?.inputName ?? clone.children[1].name
              : clone.children[1].name);
          clone.children[1].readOnly =
            array != null ? array[element]?.readOnly ?? 0 : 0;
          clone.children[1].value =
            array != null
              ? array[element]?.value ?? clone.children[1].value
              : clone.children[1].value;
          break;
        default:
          clone.children[0].disabled =
            array != null ? array[element]?.readOnly ?? 0 : 0;
          clone.children[0].name =
            array != null
              ? array[element]?.inputName ?? clone.children[0].name
              : clone.children[0].name;
          clone.children[0].value =
            array != null
              ? array[element]?.value ?? clone.children[0].value
              : clone.children[0].value;
      }

      divRow.append(clone);
    }
    divRow.append(_buttonRemove());
    globalDiv.append(divRow);
  }
  return { addElements, addValues, configuration, dynamicValues };
}
export default dynamicElements;
