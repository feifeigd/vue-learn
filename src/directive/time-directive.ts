import Time from '../ts/time';
import { DirectiveOptions } from 'vue';

const timeDirective: DirectiveOptions = {
    bind: (el, binding) => {
        const eL = el as any;
        eL.innerHTML = Time.getFormatTime(binding.value);
        eL.__timeout__ = setInterval(() => eL.innerHTML = Time.getFormatTime(binding.value), 60000);
    },
    unbind: (el) => {
        const eL = el as any;
        clearInterval(eL.__timeout__);
        delete eL.__timeout__;
    }
};

export default timeDirective;
