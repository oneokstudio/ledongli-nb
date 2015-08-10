module vazee.control {
    "use strict";
    export class Music extends PIXI.Sprite {
        private static _Instance: Music;
        static get Instance() {
            if (!Music._Instance) {
                Music._Instance = new Music();
            }
            return Music._Instance;
        }

        texOn: PIXI.Texture;
        texOff: PIXI.Texture;
        musicOn: boolean;
        constructor() {
            this.texOn = PIXI.Texture.fromFrame("MUSIC_ON.png");
            this.texOff = PIXI.Texture.fromFrame("MUSIC_OFF.png");
            super((musicOn)?this.texOn:this.texOff);
            this.visible = false;
            this.musicOn = true;
            this.position.set(77, -110);
            App.EventResize.on((aPortrait: boolean) => {
                this.x = (((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - this.width) * .5;
            });
        }

        fnActive() {
            this.visible = true;
            if (!this.interactive) {
                this.buttonMode = this.interactive = true;
                this.on("click", this.fnTap)
                    .on("tap", this.fnTap);
            }
        }

        fnTap() {
            this.musicOn = !this.musicOn;
            if (this.musicOn) {
                createjs.Sound.play("Music", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, .1);
                this.texture = this.texOn;
            } else {
                this.texture = this.texOff;
                createjs.Sound.stop();
            }
            _hmt.push(["_trackEvent", "button", "click", "Music"]);
        }
    }
} 