module vazee.share {
    "use strict";
    export class Go extends PIXI.extras.MovieClip {
        private static _Instance: Go;
        static get Instance() {
            if (!Go._Instance) {
                Go._Instance = new Go();
            }
            return Go._Instance;
        }

        constructor() {
            var _texture = [];
            for (var i = 0; i < 12; i++) {
                _texture.push(PIXI.Texture.fromFrame("Go" + i + ".png"));
            }
            super(_texture);
            this.fnReset();
            this.animationSpeed = .25;
        }

        fnReset() {
            this.position.set(500, -120);
            this.visible = false;
            this.stop();
        }
    }
}  