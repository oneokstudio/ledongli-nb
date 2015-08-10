module vazee.share {
    "use strict";
    export class Bg extends PIXI.Graphics {
        private static _Instance: Bg;
        static get Instance() {
            if (!Bg._Instance) {
                Bg._Instance = new Bg();
            }
            return Bg._Instance;
        }

        constructor() {
            super();
            App.EventResize.on((aPortrait: boolean) => {
                var _w = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x;
                this.beginFill(0);
                this.moveTo(0, 0);
                this.lineTo(_w, 0);
                this.lineTo(_w, 640);
                this.lineTo(0, 640);
                this.lineTo(0, 0);
                this.endFill();
            });
        }
    }
}  