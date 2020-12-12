
import { createPromiseShaderProgram } from './ShaderUtil.js';

export default class Material {

    constructor(gl, VS_src = '', FS_src = '') {
        this.gl = gl;
        this.shader = []; // shader program
        this.texture = []; // texture set
        this.color = [1.0, 0.5, 0.0, 1.0];
        //this.shader.push(getShaderProgram(gl,VS_src, FS_src));
    }

    set Shader(s) {
        this.shader.push(s);
    }
    set Texture(t) {
        this.texture.push(t);
    }

    async getShaderProgram(gl, VS_src, FS_src) {
        const shaderProgram = await createPromiseShaderProgram(gl, VS_src, FS_src);
        gl.useProgram(shaderProgram);
        return shaderProgram;
    }

    // async getShaderProgramPhong(gl, VS_src, FS_src) {
    //     const shaderProgram = await createPromiseShaderProgram(gl, VS_src, FS_src);
    //     gl.useProgram(shaderProgram);
    //     return shaderProgram;
    // }

}

export async function getShaderProgram(gl) {
    const shaderProgram = await createPromiseShaderProgram(gl, 'resource/shaders/vs_basic.glsl', 'resource/shaders/fs_basic.glsl');
    gl.useProgram(shaderProgram);
    return shaderProgram;
}
