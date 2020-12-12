import MeshLoader from './MeshLoader.js';
import * as mat4 from "./glm/mat4.js";
import * as vec3 from "./glm/vec3.js";

export default class Scene {

    constructor() {
        this.model = [];
        this.camera = [];
        this.lighting = [];
    }

    set Model(m) {
        this.model.push(m);
    }
    set Camera(c) {
        this.camera.push(c);
    }

    set Lighting(l) {
        this.lighting.push(l);
    }
    async addModel(gl, m) {
        //this.model.push(m);
        m.modelBuffer = await m.getBufferBasic(gl);
        this.model.push(m);
    }

    draw(gl) {

        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        gl.enable(gl.DEPTH_TEST);
        //gl.enable(gl.CULL_FACE);
        gl.depthFunc(gl.LESS);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.model.forEach(element => {

            // let model = this.model[0];
            let model = element;
            let material = model.material[0];
            let shaderProgram = material.shader[0];
            let modelBuffer = model.modelBuffer;
            let mMatrix = model.mMatrix();
            let vMatrix = mat4.create();
            let pMatrix = mat4.create();

            gl.useProgram(shaderProgram);

            let u_mMatrix = gl.getUniformLocation(shaderProgram, 'u_mMatrix');
            let u_vMatrix = gl.getUniformLocation(shaderProgram, 'u_vMatrix');
            let u_pMatrix = gl.getUniformLocation(shaderProgram, 'u_pMatrix');
            let u_Color = gl.getUniformLocation(shaderProgram, 'u_Color');


            gl.uniformMatrix4fv(u_mMatrix, false, mMatrix);
            gl.uniformMatrix4fv(u_vMatrix, false, vMatrix);
            gl.uniformMatrix4fv(u_pMatrix, false, pMatrix);
            gl.uniform4fv(u_Color, material.color);

            let a_Position = gl.getAttribLocation(shaderProgram, 'a_Position');
            gl.enableVertexAttribArray(a_Position);
            gl.bindBuffer(gl.ARRAY_BUFFER, modelBuffer.TRIANGLE_VERTEX);
            gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 4 * (3), 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelBuffer.TRIANGLE_FACES);
            gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
            gl.flush();
        });


    }
}