const Pages = {
    pages: [
        {
            name: "indexPage",
            title: "Главная",
            url: "/"
        },
        {
            name: "guidePage",
            title: "Помощь",
            url: "/guide/get-started"
        },
        {
            name: "newsPage",
            title: "Новости",
            url: "/news"
        }
    ],
    all: function () {
        return this.pages
    }
};

export {Pages};