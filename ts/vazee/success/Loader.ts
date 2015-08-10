module vazee.success {
    "use strict";
    export class Loader extends PIXI.Sprite {

        private static _Instance: Loader;
        static get Instance() {
            if (!Loader._Instance) {
                Loader._Instance = new Loader();
            }
            return Loader._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("success-loader.png"));
            this.anchor.set(1, .5);
            this.y = 320;
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .3;
            });
        }
    }
} 