module vazee.share {
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
            this.addChild(Go.Instance);
            this.addChild(Ready.Instance);
            this.addChild(Copy.Instance);
            App.EventResize.on((aPortrait: boolean) => {
                if (App.Portrait) {
                    this.rotation = -(44.9 + 90) * Math.PI / 180;
                    this.position.set(830, 800);
                } else {
                    this.rotation = -30 * Math.PI / 180;
                    this.position.set(App.WinW / App.Stage.scale.x - 980, 600);
                }
            });
        }
    }
} 