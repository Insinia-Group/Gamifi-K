import { animate, style, transition, trigger } from '@angular/animations';

export const slideIn =  [
/* SlideInLeft */
trigger('slideInLeft', [
    transition('void => *', [
      style({
        opacity: '0',
        transform: 'translateX(-100%)'
      }),
      animate('1000ms ease')
    ]),
  ]),

/* SlideInRight */
trigger('slideInRight', [
    transition('void => *', [
      style({
        opacity: '0',
        transform: 'translateX(100%)'
      }),
      animate('1000ms ease')
    ]),
  ]),

  /* SlideInDown */
  trigger('slideInDown', [
    transition('void => *', [
      style({
        opacity: '0',
        transform: 'translateY(-100%)'
      }),
      animate('1000ms ease')
    ]),
  ]),

  /* SlideInUp */
  trigger('slideInUp', [
    transition('void => *', [
      style({
        opacity: '0',
        transform: 'translateY(100%)'
      }),
      animate('1000ms ease')
    ]),
  ]),
]

export const fadeIn = [
  /* FadeIn */
  trigger('fadeIn', [
    transition('void => *', [
      style({
        opacity: '0',
      }),
      animate('1000ms ease')
    ]),
  ]),
]

export const fadeOut = [
  /* FadeIn */
  trigger('fadeOut', [
    transition('* => void', [
      style({
        opacity: '1',
      }),
      animate('1000ms ease')
    ]),
  ]),
]

export const allCustomAnimations = [
  slideIn, 
  fadeIn
]