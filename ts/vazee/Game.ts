module vazee {
    "use strict";
    export class Game extends PIXI.Container {

        private static _Instance: Game;
        static get Instance() {
            if (!Game._Instance) {
                Game._Instance = new Game();
            }
            return Game._Instance;
        }

        constructor() {
            super();
            switch (appType) {
                case "game":
                    this.fnGameInit();
                    break;
                case "offline":
                    this.fnOfflineInit();
                    break;
            }
        }

        fnOfflineInit() {
            this.addChild(friend.Friend.Instance);
            this.addChild(Logo.Instance);
        }

        fnGameInit() {
            Track.FnUpdateTrackSpeed();
            this.addChild(new Track(0));
            this.addChild(new Track(1));
            this.addChild(new Track(2));
            this.addChild(Finished.Instance);
            this.addChild(level.Level.Instance);
            this.addChild(Animal.Instance);
            this.addChild(fail.Fail.Instance);
            this.addChild(Hero.Instance);
            this.addChild(title.Title.Instance);
            this.addChild(control.Control.Instance);
            this.addChild(LevelNum.Instance);
            this.addChild(Logo.Instance);
            this.addChild(Counter.Instance);
            this.addChild(success.Success.Instance);
            this.addChild(share.Share.Instance);
            this.x = -600;
            TweenMax.to(this, 1, { x: 0 });
        }
    }
} 