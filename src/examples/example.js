import dynamicElements from '../dynamic-elements.js';

let dinamico = dynamicElements('buttonNew', 'teste', 'divAdd');
const values = [
  { id: '1', title: "I'm a value" },
  { id: '2', title: "I'm a second value" },
];
dinamico.addElements([
  {
    label: { text: 'Text 1', classes: '' },
    input: { type: 'text', order: 0, inputName: 'text1', classes: 'test' },
  },
  {
    label: { text: 'Text 2', classes: '' },
    input: { type: 'text', order: 1, inputName: 'text2', classes: 'test2' },
  },
  {
    label: { text: 'Select', classes: '' },
    input: {
      type: 'select',
      order: 2,
      inputName: 'select',
      classes: 'test3',
      values: values,
    },
  },
  {
    label: { text: 'File', classes: '' },
    input: { type: 'file', order: 3, inputName: 'file', classes: 'test4' },
  },
  {
    input: {
      type: 'button',
      order: 4,
      inputName: 'button',
      classes: 'test5',
      value: 'Click',
    },
  },
]);
let dinamico2 = dynamicElements('buttonNewValues', 'testes', 'divAddValues');
dinamico2.addElements([
  {
    label: { text: 'Text 1', classes: '' },
    input: { type: 'text', inputName: 'text1', classes: 'test' },
  },
  {
    label: { text: 'Text 2', classes: '' },
    input: { type: 'text', inputName: 'text2', classes: 'test2' },
  },
  {
    label: { text: 'Select', classes: '' },
    input: {
      type: 'select',
      inputName: 'select',
      classes: 'test3',
      values: values,
    },
  },
  {
    label: { text: 'File', classes: '' },
    input: { type: 'file', inputName: 'file', classes: 'test4' },
  },
  {
    input: {
      type: 'button',
      order: 4,
      inputName: 'button',
      classes: 'test5',
      value: 'Button Click',
    },
  },
]);
dinamico2.addValues([
  [
    { value: 'Oi', labelText: 'New Different Text' },
    { value: 'Oulá', labelText: 'New Different Text 2' },
    { value: '1', labelText: 'New Select Text' },
  ],
]);
