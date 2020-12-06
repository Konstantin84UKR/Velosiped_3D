export default class Lighting {
    constructor() {
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0];
        this.spec = [1.0, 1.0, 1.0];
    }

    set Position(p) {
        this.position = p;
    }
    set Color(c) {
        this.color = c;
    }

    set Spec(s) {
        this.spec = s;
    }

}