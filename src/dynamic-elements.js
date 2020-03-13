/**
 * Nova classe para os elementos dinâmicos, utilizando BOOTSTRAP
 * @author Bernardo Alves Roballo
 * @version 1.0
 */
class DynamicElements {
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
  }
  /**
   * Método utilizado para criar uma label de texto de descrição
   * @param {String} labelText
   */
  _label(labelText) {
    let label = document.createElement('label');
    label.innerHtml = labelText;
    return label;
  }
  /**
   * Método utilizado para criar uma div de Row
   */
  _divRow() {
    let divRow = document.createElement('div');
    return divRow;
  }
  file({ labelText, onChange, ordem }) {}
  text() {}
  dropdown() {}
  createElements() {}
}
