const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
];

function prefixNumber(time) {
    return `${time < 10 ? '0' : ''}${time}`;
}

export const formatDate = date => {
    const newDate = new Date(date);
    return `${newDate.getDate()} ${
        months[newDate.getMonth()]
    } ${newDate.getFullYear()} à ${prefixNumber(
        newDate.getHours()
    )}h${prefixNumber(newDate.getUTCMinutes())}`;
};
