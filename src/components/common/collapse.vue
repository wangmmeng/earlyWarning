<template>
    <transition
        name="laoq-transition-collapse"
        mode="out-in"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <slot></slot>
    </transition>
</template>

<script>
import LaoqUtil from '../../api/util';

export default {
    name: 'laoq-transition-collapse',
    data() {
        return {
            animation_ing: false    //记录当前是否处于动画中，如果是则切换时跳过动画，避免频繁切换时paddingTop和paddingBottom来不及还原导致显示失真
        };
    },
    methods: {
        beforeEnter(el) {
            //显示动画开始的状态
            if (this.animation_ing) return;

            this.animation_ing = true;
            LaoqUtil.addClass(el, 'laoq-transition-collapse');

            !el.dataset && (el.dataset = {});
            el.dataset.paddingTop = el.style.paddingTop;
            el.dataset.paddingBottom = el.style.paddingBottom;
            el.dataset.overflow = el.style.overflow;
            el.dataset.paddingTopComputed = LaoqUtil.getCSS(el, 'padding-top');
            el.dataset.paddingBottomComputed = LaoqUtil.getCSS(el, 'padding-bottom');

            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
            el.style.overflow = 'hidden';
        },
        enter(el) {
            //显示动画结束的状态
            let scroll_height = el.scrollHeight,
                scroll_height_computed = el.scrollHeight + parseFloat(el.dataset.paddingTopComputed) + parseFloat(el.dataset.paddingBottomComputed);

            /*
             * 元素由隐藏到显示的过程中，设置的paddingTop和paddingBottom会有延迟
             * 此时取到的scrollHeight可能只是元素内容的高度并不包含paddingTop和paddingBottom，在设置元素的显示高度时需要判断一下             * 在style内联样式之外的地方设置的paddingTop和paddingBottom通过el.style.paddingTop取不到的，所以需要通过getComputedStyle方法获取
            */
            el.style.height = Math.max(scroll_height, scroll_height_computed) + 'px';
            el.style.paddingTop = el.dataset.paddingTop;
            el.style.paddingBottom = el.dataset.paddingBottom;
        },
        afterEnter(el) {
            //显示动画结束后的收尾工作
            LaoqUtil.removeClass(el, 'laoq-transition-collapse');

            el.style.height = '';
            el.style.overflow = el.dataset.overflow;

            delete el.dataset.paddingTop;
            delete el.dataset.paddingBottom;
            delete el.dataset.overflow;
            delete el.dataset.paddingTopComputed;
            delete el.dataset.paddingBottomComputed;

            this.animation_ing = false;
        },

        beforeLeave(el) {
            //隐藏动画开始的状态
            if (this.animation_ing) return;

            this.animation_ing = true;
            LaoqUtil.addClass(el, 'laoq-transition-collapse');

            !el.dataset && (el.dataset = {});
            el.dataset.paddingTop = el.style.paddingTop;
            el.dataset.paddingBottom = el.style.paddingBottom;
            el.dataset.overflow = el.style.overflow;

            el.style.height = el.scrollHeight > 0 ? el.scrollHeight + 'px' : '';
            el.style.overflow = 'hidden';
        },
        leave(el) {
            //隐藏动画结束的状态
            el.style.height = el.scrollHeight > 0 ? 0 : '';
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        },
        afterLeave(el) {
            //隐藏动画结束后的收尾工作
            LaoqUtil.removeClass(el, 'laoq-transition-collapse');

            el.style.height = '';
            el.style.paddingTop = el.dataset.paddingTop;
            el.style.paddingBottom = el.dataset.paddingBottom;
            el.style.overflow = el.dataset.overflow;

            delete el.dataset.paddingTop;
            delete el.dataset.paddingBottom;
            delete el.dataset.overflow;

            this.animation_ing = false;
        }
    }
}
</script>

<style scoped>
	.laoq-transition-collapse {
		-webkit-transition: height 0.4s ease-in-out, padding-top 0.4s ease-in-out,
			padding-bottom 0.4s ease-in-out;
		-moz-transition: height 0.4s ease-in-out, padding-top 0.4s ease-in-out,
			padding-bottom 0.4s ease-in-out;
		transition: height 0.4s ease-in-out, padding-top 0.4s ease-in-out,
			padding-bottom 0.4s ease-in-out;
	}
</style>