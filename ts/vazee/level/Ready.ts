module vazee.level {
    "use strict";
    export class Ready extends PIXI.Sprite {
        private static _Instance: Ready;
        static get Instance() {
            if (!Ready._Instance) {
                Ready._Instance = new Ready();
            }
            return Ready._Instance;
        }
        constructor() {
            super(PIXI.Texture.fromFrame("ready.png"));
            this.position.set(1000, 168);
            this.visible = false;
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x;
            });
        }
    }
} 