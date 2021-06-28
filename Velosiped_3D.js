// Структура библиотеки это один файл программки демки в которую импортируються общие файлы.


import VELO_3D from './src/RenderLoop.js';
//import Scene from './src/Scene.js';
//import Camera from './src/Camera.js';

//const root = document.querySelector('#root');

//const scene = new Scene();
//const camera = new Camera();
async function main() {
    const VELO = new VELO_3D();
    await VELO.webGLStart(500,500);

    // Создаем материал 
    let model_1 = await VELO.createTriangelModel([0.2, 0.2, 0.8, 1.0]);
    model_1.positionSet([-0.5, 0.1, 0.0]);
    model_1.rotationSet([0.0, 0.5, 0.5]);
  
    let scene = await VELO.createScene();
    await scene.addModel(VELO.gl, model_1);
    VELO.draw(VELO.gl,scene);
};

main();

console.log(2 + 2);