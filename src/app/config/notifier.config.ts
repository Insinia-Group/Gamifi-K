import { NotifierOptions } from "angular-notifier";

export const NotifierConfiguration: NotifierOptions = {
    position: {
        horizontal: {
            position: 'middle'
        },
        vertical: {
            position: 'top',
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 3000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        stacking: 3
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'slide',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};