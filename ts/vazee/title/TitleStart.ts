module vazee.title {
    "use strict";
    export class TitleStart extends PIXI.Sprite {
        private static _Instance: TitleStart;
        static get Instance() {
            if (!TitleStart._Instance) {
                TitleStart._Instance = new TitleStart();
            }
            return TitleStart._Instance;
        }
        constructor() {
            super(PIXI.Texture.fromFrame("title-start.png"));
            this.position.set( 70, 162);
            this.visible = false;
        }

        fnActive() {
            if (!this.interactive) {
                this.buttonMode = this.interactive = true;
                this.on("click", this.fnTap)
                    .on("tap", this.fnTap);
            }
        }

        fnTap() {
            App.FnStart();
            _hmt.push(["_trackEvent", "button", "click", "StartGame"]);
        }

        handleLoad(event:createjs.Event) {
            createjs.Sound.play(event.src);
        }
    }
} 