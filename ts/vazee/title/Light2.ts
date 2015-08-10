module vazee.title {
    "use strict";
    export class Light2 extends PIXI.Sprite {
        private static _Instance: Light2;
        static get Instance() {
            if (!Light2._Instance) {
                Light2._Instance = new Light2();
            }
            return Light2._Instance;
        }
        constructor() {
            super(PIXI.Texture.fromFrame("title-light2.png"));
            this.y = 179;
            this.visible = false;
        }
    }
}  