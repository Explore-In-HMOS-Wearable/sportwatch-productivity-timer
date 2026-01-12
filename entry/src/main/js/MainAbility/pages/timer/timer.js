import Vibrator from '@system.vibrator';

let tick = null;

export default {
    data: {
        total: 1800,
        timeText: '30:00',
        remaining: 1800,
        percent: 0,
        running: false,
        vib30Done: false
    },

    onInit() {
        this.start();
    },

    onShow() {
        this.start();
    },

    start() {
        if (this.running) {
            return;
        }

        this.running = true;

        let timer = this.remaining;
        const total = this.total;

        tick = setInterval(() => {
            if (!this.vib30Done && timer <= 30 && timer > 0) {
                try {
                    Vibrator.vibrate({ mode: 'short' });
                    this.vib30Done = true;
                } catch (e) {
                }
            }

            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;

            const mm = minutes < 10 ? `0${minutes}` : String(minutes);
            const ss = seconds < 10 ? `0${seconds}` : String(seconds);

            this.timeText = `${mm}:${ss}`;
            this.percent = Math.min(100, Math.floor(((total - timer) / total) * 100));
            this.remaining = timer;

            timer -= 1;
            if (timer < 0) {
                clearInterval(tick);
                tick = null;
                this.running = false;
                this.timeText = 'Finished!';
                this.percent = 100;
                this.remaining = 0;

                try {
                    Vibrator.vibrate({ mode: 'long' });
                } catch (e) {
                }
            }
        }, 1000);
    },

    pause() {
        if (tick) {
            clearInterval(tick);
            tick = null;
        }
        this.running = false;
    },

    reset() {
        this.pause();
        this.remaining = this.total;
        this.timeText = '30:00';
        this.percent = 0;
        this.vib30Done = false;
    }
};
