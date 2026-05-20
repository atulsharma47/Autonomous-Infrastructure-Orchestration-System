export const fadeIn = {

  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },

};

export const slideUp = {

  initial: {
    opacity: 0,
    y: 12,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -12,
  },

};

export const scaleIn = {

  initial: {
    opacity: 0,
    scale: 0.96,
  },

  animate: {
    opacity: 1,
    scale: 1,
  },

  exit: {
    opacity: 0,
    scale: 0.96,
  },

};

export const sidebarMotion = {

  initial: {
    x: -30,
    opacity: 0,
  },

  animate: {
    x: 0,
    opacity: 1,
  },

};

export const cardHover = {

  whileHover: {
    scale: 1.015,
    transition: {
      duration: 0.18,
    },
  },

};