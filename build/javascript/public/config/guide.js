import GetStarted from "../components/elements/guides/get-started.jsx";
import HowReg from "../components/elements/guides/how-reg.jsx";

const GuidePages = {
    pages: [
        {
            id: "get-started",
            name: "С чего начать?",
            url: "/guide/get-started",
            component: {GetStarted}
        },
        {
            id: "how-reg",
            name: "Как зарегистрироваться?",
            url: "/guide/how-reg",
            component: {HowReg}
        }
    ],

    all: function () {
        return this.pages
    },

    get: function (id) {
        return this.pages.find(guide => guide.id === id);
    },

    getComponent: function (id) {
        if (this.get(id) !== undefined) {
            let properties = Object.getOwnPropertyNames(this.get(id).component);
            return this.get(id).component[properties[0]];
        }
        return "Упс! Такой статьи еще не существует.!";
    }
};

export {GuidePages};