module vazee {
    "use strict";
    export class Finished extends PIXI.Sprite {

        private static _Instance: Finished;
        static get Instance() {
            if (!Finished._Instance) {
                Finished._Instance = new Finished();
            }
            return Finished._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("finish.png"));
            this.position.set(9000, 106);

            App.EventUpdate.on((dt: number) => {
                this.fnUpdate(dt);
            });

        }
        fnUpdate(dt: number) {
            if (Track.Stop) {
                return;
            }
            this.x -= Track.TrackSpeed;
            if (App.State === STATE.STATE_GAMING) {
                if (this.x < -250) {
                    if (Counter.Instance.fnSuccess()) {
                        App.FnGameOver(true);
                        success.Success.Instance.fnShow();
                    } else {
                        App.FnGameOver(false);
                        fail.Fail.Instance.fnShow();
                    }
                }
            }
        }
    }
} 