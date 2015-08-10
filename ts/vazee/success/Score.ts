module vazee.success {
    "use strict";
    export class Score extends PIXI.extras.BitmapText {

        private static _Instance: Score;
        static get Instance() {
            if (!Score._Instance) {
                Score._Instance = new Score();
            }
            return Score._Instance;
        }

        private _num: number;
        constructor() {
            super("0.0", { font: "100px score-export", align: "right" });
            this.position.set(410 - this.textWidth, 105);
            this._num = 0;
        }

        get num() {
            return this._num;
        }
        set num(aNum: number) {
            this._num = aNum;
            this.text = (aNum * .01).toFixed(2);
            this.position.x = 410 - this.textWidth;
        }
        fnCenter() {
            setTimeout(() => {
                this.position.x = 410 - this.textWidth;
            }, 100);
        }
    }
}  