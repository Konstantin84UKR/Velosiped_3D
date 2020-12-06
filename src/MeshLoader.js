export default class MeshLoader {
    constructor() {

    }

    async loadJSON(gl, modelURL) {
        var xhr = new XMLHttpRequest();
        var model;

        xhr.open('GET', modelURL, false);
        xhr.onload = function () {
            if (xhr.status != 200) {

                alert('LOAD' + xhr.status + ': ' + xhr.statusText);
            } else {

                gl.model = JSON.parse(xhr.responseText);
                // model = JSON.parse(xhr.responseText);
                // return true;
            }
        }
        xhr.send();
    }


    async LoadJSONUsingPromise(URL) {

        let promise = new Promise(await function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', URL, true);
            xhr.onload = () => resolve(JSON.parse(xhr.responseText));
            xhr.onerror = () => resolve(console.log(xhr.statusText));
            xhr.send();
        });

        return promise;
    }

    async loadFirstTriangle(gl) {
        let mesh = { meshes: null };

        let meshes = [];

        let o = {
            ModelVertices: [],
            faces: []
        };
        // o.vertices = [
        //     -0.0, 0.5, 0.0,
        //     -0.5, -0.5, 0.0,
        //     0.5, -0.5, 0.0,
        // ];
        o.vertices = this.v;
        o.faces = [
            0, 1, 2
        ];
        meshes.push(o);
        mesh.meshes = meshes;
        return mesh;
    }

}