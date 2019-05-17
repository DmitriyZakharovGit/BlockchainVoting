const Pages = {
    pages: [
        {
            name: "indexPage",
            title: "Личный кабинет",
            url: "/private/"
        },
        {
            name: "electionsPage",
            title: "Мои выборы",
            url: "/private/elections/"
        },
        {
            name: "settingsPage",
            title: "Настройки",
            url: "/private/settings/"
        },
        {
            name: "exitPage",
            title: "Выход",
            url: "/private/exit/"
        }
    ],
    all: function () {
        return this.pages
    }
};

export {Pages};