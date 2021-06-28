
import Camera, { vec3 } from './Camera.js';
import Material from './Material.js';
import MeshLoader from './MeshLoader.js';
import Model from './Model.js';
import Scene from './Scene.js';
import { getShaderProgram } from './Material.js';
//import { createPromiseShaderProgram } from './ShaderUtil.js';

export default class RenderLoop {

    constructor() {
        this.canvas = null;
        this.gl = null;
        this.scene = null;
    }

    async initRender() {

        const material = new Material();
        const shaderProgram = await material.getShaderProgram(this.gl, '../src/shaders/vs_basic2.glsl', '../src/shaders/fs_basic2.glsl');
        material.Shader = shaderProgram;
        material.color = [0.2, 0.2, 0.8, 1.0];


        const material_2 = new Material();
        material_2.Shader = await material_2.getShaderProgram(this.gl, '../src/shaders/vs_basic2.glsl', './src/shaders/fs_basic2.glsl');
        material_2.color = [1.0, 0.5, 0.0, 1.0];

        const material_3 = new Material();
        material_3.Shader = await material_3.getShaderProgram(this.gl, '../src/shaders/vs_basic2.glsl', '../src/shaders/fs_basic2.glsl');
        material_3.color = [0.0, 0.8, 0.5, 1.0];
      
        const meshLoader = new MeshLoader();
        const mesh = await meshLoader.loadFirstTriangle(this.gl);
        const mesh_1 = await meshLoader.loadFirstTriangle(this.gl);
        const mesh_2 = await meshLoader.loadFirstTriangle(this.gl);
  
        const model = new Model();
        model.Mesh = mesh.meshes[0];
        model.Material = material;
        model.positionSet([-0.5, 0.5, 0.0]);
        model.rotationSet([0.0, 0.0, 0.5]);
  

        const model_1 = new Model();
        model_1.Mesh = mesh_1.meshes[0];
        model_1.Material = material_2;
        model_1.positionSet([0.5, 0.5, 0.2]);
    

        const model_2 = new Model();
        model_2.Mesh = mesh_2.meshes[0];
        model_2.Material = material_3;
        model_2.positionSet([0.0, -0.5, 0.1]);
        model_2.rotationSet([0.0, 0.0, 0.5]);


        this.scene = new Scene();
        await this.scene.addModel(this.gl, model);
        await this.scene.addModel(this.gl, model_1);
        await this.scene.addModel(this.gl, model_2);
        //scene.Material = material;

        //scene.draw(this.gl);
        this.scene.gl = this.gl;

        // const animate = function () {
        //     requestAnimationFrame(animate);

        //     model.rotationSet([0.01, 0.0, -0.00]);
        //     model_1.rotationSet([0.0, 0.001, 0.01]);
        //     model_2.rotationSet([0.0, -0.01, 0.0]);

        //     this.scene.draw(this.scene.gl);
        // };
        // animate();
        return this.scene;
        ////////////////////////////////////
    }

    async draw(scene) {
        const animate = function () {
            requestAnimationFrame(animate);

            scene.models[0].rotationSet([0.01, 0.0, -0.00]);
            scene.models[1].rotationSet([0.0, 0.001, 0.01]);
            scene.models[2].rotationSet([0.0, -0.01, 0.0]);

            scene.draw(scene.gl);
        };
        await animate();
    }


    async webGLStart(width,height) {

        const canvas = document.body.appendChild(document.createElement('canvas'));
        //  const canvas = document.getElementById("canvasGL");
        if (!canvas) {
            console.log('failed');
            return;
        }

        canvas.width = width; //screen.width;
        canvas.height = height; //screen.height;

        this.canvas = canvas;

        let gl;
        try {

            gl = this.canvas.getContext("webgl2", { antialias: true });
            this.gl = gl;

        } catch (e) {
            alert("You are not webgl compatible :(");
            return false;
        }

        let scene = await this.initRender();
        return scene;
    }


}
