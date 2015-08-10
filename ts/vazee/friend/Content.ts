module vazee.friend {
    "use strict";
    export class Content extends PIXI.Container {

        private static _Instance: Content;
        static get Instance() {
            if (!Content._Instance) {
                Content._Instance = new Content();
            }
            return Content._Instance;
        }

        constructor() {
            super();
            this.addChild(Copy.Instance);
            this.addChild(Score.Instance);
            this.addChild(BtnGame.Instance);
            // this.addChild(Name.Instance);
            this.rotation = -(11.4 + 90) * Math.PI / 180;
            this.position.set(260, 580);
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .6;
            });
        }
    }
} 