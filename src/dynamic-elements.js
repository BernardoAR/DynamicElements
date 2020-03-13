/**
 * Nova classe para os elementos dinâmicos
 * @author Bernardo Alves Roballo
 * @version 0.1
 */
class DynamicElements {
  /**
   * Construtor com o básico necessário para a criação de um elemento dinâmico
   * @param {string} botao - Nome do botão que será utilizado para a ação de criar elemento
   * @param {string} nome - Nome utilizado para o input, utilizado como post
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

  file({ arrayName, label, onChange, ordem }) {}
  text() {}
  dropdown() {}
  createElements() {}
}
