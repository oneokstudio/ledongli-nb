declare var username;

module vazee {
    "use strict";
    export class Counter extends PIXI.extras.BitmapText {

        private static _Instance: Counter;
        static get Instance() {
            if (!Counter._Instance) {
                Counter._Instance = new Counter();
            }
            return Counter._Instance;
        }

        static Stop: boolean = true;
        private _num: number;
        constructor() {
            super("0.0s", { font: "60px font-export", align:"right" });
            this.x = 820;
            this.y = -100;
            this._num = 0;
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - 140;
            });
            App.EventState.on((aState: STATE) => {
                switch (aState) {
                    case STATE.STATE_START:
                        TweenMax.to(this, .6, { y: 20, ease: Back.easeOut });
                        break;
                    case STATE.STATE_GAMING:
                        Counter.Stop = false;
                        break;
                    case STATE.STATE_GAMEOVER:
                        if (App.Success) {
                            this.fnSetWx();
                        }
                        break;
                }
            });

            App.EventUpdate.on((dt: number) => {
                this.fnUpdate(dt);
            });
        }

        fnUpdate(dt:number) {
            if (!Counter.Stop) {
                this.num += dt * .035 ;
            }
        }

        fnSuccess() {
            Counter.Stop = true;
            switch (curLevel) {
                case 1:
                    return (this._num <= 500);
                case 2:
                    return (this._num <= 390);
                case 3:
                    return (this._num <= 360);
                case 4:
                    return (this._num <= 310);
                case 5:
                    return (this._num <= 250);
            }
        }

        fnSetWx() {
            var _link = appurl + "share.php?friend=1&friendlevel="+curLevel+"&score=" + this._num + "&name=" + encodeURIComponent(username);
            fnWxShare(fnGetCopy(this._num, username, curLevel), _link);
        }

        get num() {
            return this._num;
        }
        set num(aNum: number) {
            this._num = aNum;
            this.text = (aNum*.01).toFixed(2)+"s";
        }
    }
}  