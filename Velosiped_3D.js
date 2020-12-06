import RenderLoop from './src/RenderLoop.js';
import Scene from './src/Scene.js';

const root = document.querySelector('#root');
const renderLoop = new RenderLoop();
const scene = new Scene();

renderLoop.webGLStart();

console.log(2 + 2);