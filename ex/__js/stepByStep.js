var StepByStep = function (data, conteiner, fadeIn_function) {
    this.data = data;
    this.conteiner_e = $(conteiner);

    this.default = $.grep(this.data, function(e){ return e.default === true;})[0] || this.data[0];
    this.active = this.default;

    this.findPrev = function () {
        if (this.active.prev) {
            var prev_name = this.active.prev;

            var prev = $.grep(this.data, function(e){ return e.name === prev_name;})[0];

            if (prev) {
                this.active = prev;
                return true;
            } else {
                console.log('Cannot find prev step by name ', prev_name);
                return false;
            }
        }
    };
    this.findNext = function () {
        if (this.active.next) {
            var next_name = this.active.next;

            var next = $.grep(this.data, function(e){ return e.name === next_name;})[0];

            if (next) {
                this.active = next;
                return true;
            } else {
                console.log('Cannot find next step by name ', next_name);
                return false;
            }
        }
    };

    this.show = function (step) {
        step = step || this.active;
        this.conteiner_e.find('.step').fadeOut(0);
        console.log(step);
        if (step) {
            fadeIn_function(step.e);
        } else {
            console.error('Step active elem is wrong')
        }

    };
    this.show();

    this.showByName = function (name) {
        var s = $.grep(this.data, function(e){ return e.name === name;})[0];
        console.log(s);
        if (s) {
            this.active = s;
            this.show(s);
        } else {
            console.error('Step elem is wrong')
        }

    };

    this.next = function () {
        if (typeof this.active.f_next === 'function') {
            this.active.f_next(this);
        }
        if (this.active.next) {
            this.findNext();
            this.show();
        }

    };

    this.prev = function () {
        if (typeof this.active.f_prev === 'function') {
            this.active.f_prev(this);
        }
        this.findPrev();
        this.show();
    }

};

$(document).ready(function () {


});