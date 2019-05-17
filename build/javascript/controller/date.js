class DateTimeFormat {
    static addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    static getDate(date) {
        let day = DateTimeFormat.addZero(new Date(date).getDate());
        let month = DateTimeFormat.addZero(new Date(date).getMonth() + 1);
        let year = DateTimeFormat.addZero(new Date(date).getFullYear());

        return `${day}.${month}.${year}`;
    }

    static getTime(time) {
        let hour = DateTimeFormat.addZero(new Date(time).getHours());
        let minutes = DateTimeFormat.addZero(new Date(time).getMinutes());

        return `${hour}:${minutes}`;
    }

    static getDateTime(dateTime) {
        return `${DateTimeFormat.getDate(dateTime)} ${DateTimeFormat.getTime(dateTime)}`;
    }

    static getDateTimeMSK(dateTime) {
        let dateTimeObject = new Date(dateTime);
        dateTimeObject.setHours(new Date(dateTime).getHours() + 3);

        return `${DateTimeFormat.getDate(dateTime)} ${DateTimeFormat.getTime(dateTimeObject)}`;
    }

}

export {DateTimeFormat};