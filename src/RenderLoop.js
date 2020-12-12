
import Camera, { vec3 } from './Camera.js';
import Material from './Material.js';
import MeshLoader from './MeshLoader.js';
import Model from './Model.js';
import Scene from './Scene.js';
import { getShaderProgram } from './Material.js';
import { createPromiseShaderProgram } from './ShaderUtil.js';

export default class RenderLoop {

    constructor() {
        this.canvas = null;
        this.gl = null;
    }

    // VSHADER_SOURCE =
    //     'attribute vec4 a_Position;\n' +
    //     'attribute float a_PointSize;\n' +
    //     'void main() {\n' +
    //     ' gl_PointSize = a_PointSize;\n' +
    //     ' gl_Position = a_Position;\n' +
    //     ' }\n'


    // FSHADER_SOURCE =
    //     ' precision mediump float;\n' +
    //     ' void main() {\n' +
    //     ' gl_FragColor = vec4(0.2, 0.2, 0.8, 1.0);\n' +
    //     ' }\n';

    // getShader(id, str) {

    //     var shader;
    //     if (id == 'vs') {
    //         shader = this.gl.createShader(this.gl.VERTEX_SHADER);

    //     } else if (id == 'fs') {
    //         shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    //     } else {
    //         return null;
    //     }

    //     this.gl.shaderSource(shader, str);
    //     this.gl.compileShader(shader);

    //     if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
    //         alert(this.gl.getShaderInfoLog(shader));
    //         return null;
    //     }

    //     return shader;

    // }

    async initShaders() {

        const material = new Material();
        const shaderProgram = await material.getShaderProgram(this.gl, '/src/shaders/vs_basic.glsl', '/src/shaders/fs_basic.glsl');
        material.Shader = shaderProgram;
        // const shaderProgram = await createPromiseShaderProgram(this.gl, 'resource/shaders/vs_basic.glsl', 'resource/shaders/fs_basic.glsl');
        // this.gl.useProgram(shaderProgram); loadJSON(gl, 'resource/Model.json')
        const meshLoader = new MeshLoader();
        // const mesh2 = await meshLoader.LoadJSONUsingPromise('resource/model_normal_2.json');
        const mesh = await meshLoader.loadFirstTriangle(this.gl);
        const mesh_1 = await meshLoader.loadFirstTriangle(this.gl);
        const mesh_2 = await meshLoader.loadFirstTriangle(this.gl);

        mesh.meshes[0].vertices = [
            -0.0, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
        ];

        const model = new Model();
        model.Mesh = mesh.meshes[0];
        model.Material = material;
        model.positionSet(0.5, -0.5, 0.0);



        mesh_1.meshes[0].vertices = [
            -0.0, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
        ];

        const model_1 = new Model();
        model_1.Mesh = mesh_1.meshes[0];
        model_1.Material = material;
        model_1.positionSet(0.5, 0.5, 0.0);


        mesh_2.meshes[0].vertices = [
            -0.0, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
        ];

        const model_2 = new Model();
        model_2.Mesh = mesh_2.meshes[0];
        model_2.Material = material;
        model_2.positionSet(0.0, 0.5, 0.0);

        const scene = new Scene();
        await scene.addModel(this.gl, model);
        await scene.addModel(this.gl, model_1);
        await scene.addModel(this.gl, model_2);
        //scene.Material = material;

        scene.draw(this.gl);
        ////////////////////////////////////
    }


    async webGLStart() {

        const canvas = document.body.appendChild(document.createElement('canvas'));
        //  const canvas = document.getElementById("canvasGL");
        if (!canvas) {
            console.log('failed');
            return;
        }

        canvas.width = 800; //screen.width;
        canvas.height = 600; //screen.height;

        this.canvas = canvas;

        let gl;
        try {

            gl = this.canvas.getContext("webgl", { antialias: true });
            this.gl = gl;

        } catch (e) {
            alert("You are not webgl compatible :(");
            return false;
        }

        await this.initShaders();


    }




}
