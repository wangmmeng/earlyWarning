'use strict';

const LaoqUtil = {
    addClass(ele, cls) {
        if (!ele || !cls) return;

        cls = cls.trim();
        let cur_class = ele.className;

        cls.split(' ').forEach(item => {
            if (!item) return true;

            if (ele.classList) {
                ele.classList.add(item);
            } else {
                cur_class += ' ' + item;
            }
        });

        !ele.classList && (ele.className = cur_class);
    },

    removeClass(ele, cls) {
        if (!ele || !cls) return;

        cls = cls.trim();
        let cur_class = ' ' + ele.className + ' ';
        cls.split(' ').forEach(item => {
            if (!item) return true;

            if (ele.classList) {
                ele.classList.remove(item);
            } else {
                cur_class = cur_class.replace(' ' + item + ' ', '');
            }
        });

        !ele.classList && (ele.className = cur_class.trim());
    },

    getCSS(ele, prop) {
        return window.getComputedStyle(ele, null).getPropertyValue(prop) || '';
    }
};

export default LaoqUtil;