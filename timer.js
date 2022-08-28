class Timer {
    constructor(element) {
        this.status = 'off';
        this.element = element;
        this.minute = element.children[0];
        this.second = element.children[2];
        this.minV = this.minute.innerText * 1;
        this.secV = this.second.innerText * 1;
    }

    setDisplayValue (min, sec) {
        this.minute.innerText = min;
        if (this.secV < 10) {
            this.second.innerText = '0' + sec.toString();
        } else {
            this.second.innerText = sec;
        }
    }

    updateValue () {
        if (this.minV === 0 && this.secV ===0) {
            return;
        }
        if (this.secV === 0 && this.minV > 0) {
            this.secV = 59;
        } else {
            this.secV = this.secV -1;
        }
        this.setDisplayValue(this.minV, this.secV);
    }

    setTimer (min, sec) {
        this.minV = min;
        this.secV = sec;
        this.setDisplayValue(this.minV, this.secV);
    }

    start() {
        this.repeat = setInterval( () => {
            if(this.status === 'on') {
                this.updateValue();
                this.setDisplayValue(this.minV, this.secV);
            } else {
                clearInterval(this.repeat);
            }
        },1000);
    }
}

