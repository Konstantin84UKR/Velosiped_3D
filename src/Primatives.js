import Material from './Material.js';
import MeshLoader from './MeshLoader.js';
import Model from './Model.js';

const Primatives = {}; 
Primatives.XYZ_axis = class {
    static createMesh(){
   
      let model = new Model();

      let material = new Material();
      let shaderProgram = await material.getShaderProgram(this.gl, '../src/shaders/vs_basic2.glsl', '../src/shaders/fs_basic2.glsl');
      material.Shader = shaderProgram;
      material.color = colorArr;  

      let meshLoader = new MeshLoader();
      let mesh = await meshLoader.loadFirstTriangle(this.gl);
   
      model.Mesh = mesh.meshes[0];
      model.Material = material;
  
      return model;

    }
   
}