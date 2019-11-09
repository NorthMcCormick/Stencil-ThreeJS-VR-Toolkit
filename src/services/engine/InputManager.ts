import { EventEmitter } from './EventEmitter';

var IN_WORKER = false;

var DEFAULTS = {
    autostart: true,
    buttonThreshold: 0.1,
    emitEventsOnWindow: !IN_WORKER,
    postMessageEvents: IN_WORKER,
    mappings: {
        'noid': {
            'b0': 'A',
            'b1': 'B',
            'b2': 'X',
            'b3': 'Y',
            'b5': 'R',
            'b4': 'L'
        }
    }
};

export class InputManager {
    private events: EventEmitter;

    private settings: any = {};

    private currentState: any = {};
    private previousState: any = {};

    private _enabled: boolean = false;

    private gamepads: Gamepad[] = [];

    constructor() {
        this.settings = Object.assign({}, DEFAULTS, this.settings);

        console.log(this.currentState, this.previousState);

        this.events = new EventEmitter();

        window.addEventListener("gamepadconnected", (event: any) => {
            console.log("A gamepad connected:");
            console.log(event.gamepad);

            this.startPolling();
        });

        window.addEventListener("gamepaddisconnected", (event: any) => {
            console.log("A gamepad disconnected:");
            console.log(event.gamepad);
            this.stopPolling();
        });
    }

    loop() {
        this.gamepads = navigator.getGamepads();
        
        var gp;
        var btn;
        var btnState;
        var previousBtnState;
        var queue = [];

        for (var i = 0, len = this.gamepads.length; i < navigator.getGamepads().length; ++i) {
            gp = navigator.getGamepads()[i];
            if (!gp) { continue; }

            let gpid = gp.id != '' ? gp.id : 'noid';

            //console.log(gp);
            //console.log(gpid);
            // if (this.select && this.select !== gp.id) { continue; }
            this.currentState[gpid] = {};
            
            if (!this.previousState[gpid]) {
                this.previousState[gpid] = {};
            }

            if (gp.buttons) {
                len = gp.buttons.length;

                for (var j = 0; j < len; ++j) {
                    btn = gp.buttons[j];

                    btnState = this.currentState[gpid]['b' + j] = {
                        gamepad: {
                            index: i,
                            id: gpid
                        },
                        button: {
                            index: j,
                            value: this.buttonValue(btn),
                            pressed: this.buttonPressed(btn),
                            name: this.buttonName(gp, j)
                        }
                    };

                    previousBtnState = this.previousState[gpid]['b' + j] = this.previousState[gpid]['b' + j] || {
                        gamepad: {
                            index: i,
                            id: gpid
                        },
                        button: {
                            index: j,
                            value: 0,
                            pressed: false,
                            name: this.buttonName(gp, j)
                        }
                    };

                    if (btnState.button.value !== previousBtnState.button.value) {
                        queue.push(['gamepad.buttonvaluechange', btnState]);
                    }

                    if (btnState.button.pressed && !previousBtnState.button.pressed) {
                        queue.push(['gamepad.buttondown', btnState]);
                    } else if (!btnState.button.pressed && previousBtnState.button.pressed) {
                        queue.push(['gamepad.buttonup', btnState]);
                    }
                }
            }
        }

        queue.forEach((eventToEmit) => {
            var name = eventToEmit[0];
            var detail = eventToEmit[1];

            var event = this.formatEvent(name, detail);
        
            
            this.emit(event);

            if (detail.button && detail.button.name) {
                name = name + '.' + detail.button.name;

                event = this.formatEvent(name, detail);

                this.emit(event);
            }
        });

        this.previousState = Object.assign({}, this.currentState);
    }
    
    formatEvent (name, detail) {
        var event = new CustomEvent(name, {detail: detail});

        Object.keys(detail).forEach(function (key) {
          event[key] = detail[key];
        });

        return event;
    }

    emit (event) {
        window.dispatchEvent(event);

        // if (!this.supported) { return; }

        /*if (this.settings.emitEventsOnWindow) {
            window.dispatchEvent(event);
        }

        if (this.settings.postMessageEvents) {
            self.postMessage({type: 'event', data: {type: event.type, detail: event}}, '*');
        }*/
    };

    startPolling() {
        this._enabled = true;

        const handler = () => {
            this.loop();

            if (this._enabled) {
                window.requestAnimationFrame(handler);
            }
        };

        window.requestAnimationFrame(handler);

        self.removeEventListener('gamepadconnected', this.startPolling);
    }

    stopPolling() {        
        this._enabled = false;
    }

    getEvents() {
        return this.events;
    }

    buttonValue = function (btn) {
        return btn.value;
    }

    buttonPressed = function (btn) {
        if (btn.pressed === true) {
            return true;
        }

        return false;
    }

    buttonName = function (gp, btnIndex) {
        return this.settings.mappings[gp.id] && this.settings.mappings[gp.id]['b' + btnIndex];
    }
      


    /**
     * PS4 Controller - Safari IOS 13
     * 
     * Unsupported Buttons ): 
     * - Start
     * - Select
     * - Click pad thing
     * - Joystick Clicks, ugh apple...
     * 
     * D pad - 
     *  up - axe 5 = 1
     *  down - axe 5 = -1
     *  left - axe 4 = -1
     *  right - axe 4 = 1
     * 
     * Left Joy
     *  LR - axe 0 - -1 to 1
     *  UD - axe 1 - 1 to -1
     * 
     * Right Joy
     *  LR - axe 2 - -1 to 1
     *  UD - axe 3 - 1 to -1
     * 
     *  Triangle (inv/aux) - B3
     *  Circle (back/cancel) - B1
     *  X (action) - B0
     *  Square (inv/aux) - B2
     * 
     *  L - B4
     *  R - B5
     * 
     *  L Analog - B6 0-1
     *  R Analog - B7 0-1
     */

    /**
     * Nimbus - Safari IOS 13
     * 
     * Unsupported Buttons ): 
     * - Start
     * - Select
     * - Click pad thing
     * - Joystick Clicks, ugh apple...
     * 
     * D pad - 
     *  up - axe 5 = 0 - 1
     *  down - axe 5 = 0 - -1
     *  left - axe 4 = 0 - -1
     *  right - axe 4 = 0 - 1
     * 
     * Left Joy
     *  LR - axe 0 - -1 to 1
     *  UD - axe 1 - 1 to -1
     * 
     * Right Joy
     *  LR - axe 2 - -1 to 1
     *  UD - axe 3 - 1 to -1
     * 
     *  Y (inv/aux) - B3
     *  B (back/cancel) - B1
     *  A (action) - B0
     *  X (inv/aux) - B2
     * 
     *  L - B4
     *  R - B5
     * 
     *  L Analog - B6 0-1
     *  R Analog - B7 0-1
     */
}