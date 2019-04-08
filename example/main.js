import * as style from './style.scss';
import Midday from '../src/index';

new Midday(document.getElementById('basic-nav'), {});
new Midday(document.getElementById('custom-nav'), {});
new Midday(document.getElementById('custom-nav-no-default'), {});


const options = {
    sectionSelector: 'noon',
    headerClass: 'customOuter',
    innerClass: 'customInner',
    defaultClass: 'primary'
};
new Midday(document.getElementById('options-nav'), options);
