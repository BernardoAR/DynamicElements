import { DynamicElements } from '../dynamic-elements.js';
const addText = new DynamicElements('buttonAddText', 'textPost', 'divAddText');
addText.addElement({ labelText: "I'm a text input", inputName: 'text' });
const addFile = new DynamicElements('buttonAddFile', 'filePost', 'divAddFile');
addFile.addElement({ labelText: "I'm a file input", inputName: 'file' });
const addDropdown = new DynamicElements(
  'buttonAddDropdown',
  'dropdownPost',
  'divAddDropdown'
);
const value = [
  { id: '1', title: "I'm a value" },
  { id: '2', title: "I'm a second value" }
];
addDropdown.addElement({
  labelText: "I'm a dropdown",
  inputName: 'dropdown',
  onChange: "alert('I am a onchange');",
  values: value
});
