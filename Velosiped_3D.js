import RenderLoop from './src/RenderLoop.js';
//import Scene from './src/Scene.js';
//import Camera from './src/Camera.js';

//const root = document.querySelector('#root');

//const scene = new Scene();
//const camera = new Camera();
async function main() {
    const renderLoop = new RenderLoop();
    await renderLoop.webGLStart();
    //let scene = renderLoop.initRender();
    renderLoop.draw(renderLoop.scene);
};

main();

console.log(2 + 2);