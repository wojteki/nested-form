export const enterAnimation = {
    from: {
        opacity: 0,
        transform: 'translateX(-100%)'
    },
    to: {
        opacity: 1,
        transform: 'translateX(0)'
    }
};

export const leaveAnimation = {
    from: {
        opacity: 1,
        transform: 'translateX(0)'
    },
    to: {
        opacity: 0,
        transform: 'translateX(100%)'
    }
};
