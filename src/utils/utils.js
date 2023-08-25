export function minuteConversion(n) {
    const num = n;
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    if (rhours === 0) {
        return `${rminutes}м`;
    } else if (rminutes === 0) {
        return `${rhours}ч`;
    } else {
        return `${rhours}ч ${rminutes}м`;
    }
}

export function searchFilter(array, query, short) {
    if (!array || !query) {
        return [];
    }
    return array.filter((element) => {
        let durationInHours = true;
        if (short) {
            durationInHours = element.duration <= 40
        }

        const nameEnumerationRu = element.nameRU
            .toLowerCase()
            .includes(query.toLowerCase());

        const nameEnumerationEn = element.nameEN
            .toLowerCase()
            .includes(query.toLowerCase());

        return (nameEnumerationRu || nameEnumerationEn) && durationInHours;
    });
}
