module vazee.share {
    "use strict";
    export class Shoe extends PIXI.Sprite {
        private static _Instance: Shoe;
        static get Instance() {
            if (!Shoe._Instance) {
                Shoe._Instance = new Shoe();
            }
            return Shoe._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromImage((App.Portrait) ? "img/share-back.jpg" : "img/share-back-landscape.jpg"));
            this.visible = false;
            App.EventResize.on((aPortrait: boolean) => {
                this.texture = PIXI.Texture.fromImage((aPortrait) ? "img/share-back.jpg" : "img/share-back-landscape.jpg");
                this.x = (((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - this.width) * .5;
            });
        }
    }
}   