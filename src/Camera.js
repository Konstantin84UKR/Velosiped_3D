
import * as glMatrix from "./glm/common.js";
import * as mat2 from "./glm/mat2.js";
import * as mat2d from "./glm/mat2d.js";
import * as mat3 from "./glm/mat3.js";
import * as mat4 from "./glm/mat4.js";
import * as quat from "./glm/quat.js";
import * as quat2 from "./glm/quat2.js";
import * as vec2 from "./glm/vec2.js";
import * as vec3 from "./glm/vec3.js";
import * as vec4 from "./glm/vec4.js";
export { glMatrix, mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 };

export default class Camera {

    constructor(gl, cameraType) {

        this.gl = gl;
        this.cameraType = cameraType;

        let viewMatrix = mat4.create();
        mat4.identity(viewMatrix);

        let projMatrix = mat4.create();
        mat4.identity(projMatrix);

        let fovy = 40 * Math.PI / 180;
        mat4.perspective(projMatrix, fovy, gl.canvas.width / gl.canvas.height, 1, 100);

        this.vMatrix = viewMatrix;
        this.pMatrix = projMatrix;

        this.eye = vec3.create([0.0, 0.0, 10.0]);	//Traditional X,Y,Z 3d position
        this.center = vec3.create([0.0, 1.0, 0.0]);	//How much to scale a mesh. Having a 1 means no scaling is done.
        this.up = vec3.create([0.0, 1.0, 0.0]);	//Hold rotation values based on degrees, Object will translate it to radians

    }

    //Methods
    activatePerspective() {
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeigth, 0.1, 100, this.pMatrix);
    };

    activateOrtho() {
        mat4.ortho(this.pMatrix, left, right, bottom, top, 0.1, 100);
    };
    //glMatrix.mat4.ortho(PROJMATRIX,-5., 5., -5., 5., .1, 25.);
};


