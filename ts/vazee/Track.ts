module vazee {
    "use strict";
    export class Track extends PIXI.Sprite {
        static TRACK_W = 1032;
        static Stop = true;
        static Facter: number = 0;
        static TrackSpeed: number = 0;

        constructor(aId:number) {
            super(PIXI.Texture.fromFrame("img/track.jpg"));
            this.x = aId * Track.TRACK_W;
            App.EventUpdate.on((dt:number) => {
                this.fnUpdate(dt);
            });
            App.EventState.on((aState: STATE) => {
                switch (aState) {
                    case STATE.STATE_GAMING:
                        Track.Stop = false;
                        TweenMax.to(Track, .8, { Facter: 1.8, ease:Linear.easeNone });
                        break;
                }
            });
        }

        static FnUpdateTrackSpeed() {
            App.EventUpdate.on((dt: number) => {
                if (Track.Stop) {
                    return;
                }
                Track.TrackSpeed = Hero.Instance.animationSpeed * dt * Track.Facter;
            });
        }

        fnUpdate(dt: number) {
            if (Track.Stop) {
                return;
            }
            this.x -= Track.TrackSpeed;
            if (this.x < -Track.TRACK_W) {
                this.x += Track.TRACK_W * 3;
            }
        }
    }
} 