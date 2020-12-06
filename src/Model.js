export default class Model {

    constructor(gl) {
        this.gl = gl;
        this.mesh = [];
        this.material = [];
    }

    set Mesh(m) {
        this.mesh.push(m);
    }

    set Material(m) {
        this.material.push(m);
    }

    loadBuffer(gl, meshes) {

        let modelbuffer = {

            TRIANGLE_VERTEX: 0,
            TRIANGLE_UV: 0,
            TRIANGLE_NORMAL: 0,
            TRIANGLE_TANGENT: 0,
            TRIANGLE_BITANGENT: 0,
            TRIANGLE_FACES: 0,
            ModelIndiceslength: 0,
        };

        let ModelVertices = meshes.vertices;
        let ModelIndices = [].concat.apply([], meshes.faces);
        let ModelTexCoords = meshes.texturecoords[0];
        let ModelNormal = meshes.normals;
        let ModelTangent = meshes.tangents;
        let ModelBiTangent = meshes.bitangents;
        modelbuffer.ModelIndiceslength = ModelIndices.length;

        modelbuffer.TRIANGLE_VERTEX = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, modelbuffer.TRIANGLE_VERTEX);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelVertices), gl.STATIC_DRAW);

        // modelbuffer.TRIANGLE_VERTEX = TRIANGLE_VERTEX;

        modelbuffer.TRIANGLE_UV = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, modelbuffer.TRIANGLE_UV);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelTexCoords), gl.STATIC_DRAW);

        modelbuffer.TRIANGLE_NORMAL = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, modelbuffer.TRIANGLE_NORMAL);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelNormal), gl.STATIC_DRAW);

        modelbuffer.TRIANGLE_TANGENT = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, modelbuffer.TRIANGLE_TANGENT);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelTangent), gl.STATIC_DRAW);

        modelbuffer.TRIANGLE_BITANGENT = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, modelbuffer.TRIANGLE_BITANGENT);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelBiTangent), gl.STATIC_DRAW);

        modelbuffer.TRIANGLE_FACES = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelbuffer.TRIANGLE_FACES);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ModelIndices), gl.STATIC_DRAW);

        gl.modelbufferPlane = modelbuffer;
        return modelbuffer;

    }

    getBuffer(gl) {
        this.mesh.forEach(element => {

            element.buffer = this.loadBuffer(gl, element);

        });
    }

    getBufferBasic(gl) {


        let modelbuffer = {

            TRIANGLE_VERTEX: 0,
            TRIANGLE_UV: 0,
            TRIANGLE_NORMAL: 0,
            TRIANGLE_TANGENT: 0,
            TRIANGLE_BITANGENT: 0,
            TRIANGLE_FACES: 0,
            ModelIndiceslength: 0,
        };

        // const ModelVertices = [
        //     0.0, 0.5, 0.0,
        //     -0.5, -0.5, 0.0,
        //     0.5, -0.5, 0.0,
        // ];

        const ModelVertices = this.mesh[0].vertices;

        modelbuffer.TRIANGLE_VERTEX = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, modelbuffer.TRIANGLE_VERTEX);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ModelVertices), gl.STATIC_DRAW);

        // const ModelIndices = [
        //     0, 1, 2
        // ];
        const ModelIndices = this.mesh[0].faces;
        modelbuffer.TRIANGLE_FACES = gl.createBuffer();


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelbuffer.TRIANGLE_FACES);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(ModelIndices), gl.STATIC_DRAW);

        // element.modelBuffer = modelbuffer;
        return modelbuffer;

    }


}