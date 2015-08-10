module vazee.success {
    "use strict";
    export class Ending extends PIXI.extras.MovieClip {

        private static _Instance: Ending;
        static get Instance() {
            if (!Ending._Instance) {
                Ending._Instance = new Ending();
            }
            return Ending._Instance;
        }

        constructor() {
            var _texture = [];
            for (var i = 0; i < 30; i++) {
                _texture.push(PIXI.Texture.fromFrame("ending" + App.FnZeroFill(i, 3) + ".png"));
            }
            super(_texture);
            this.anchor.set(.5, .6);
            this.y = 320;
            this.animationSpeed = .33;
            this.loop = false;
            this.visible = false;
            this.onComplete = () => {
                this.gotoAndPlay(10);
            };
            this.x = ((App.Portrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .25;
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .25;
            });
        }
    }
} 