class View {

    buttonClick() {
        var btn = document.getElementById('btn');
        btn.addEventListener('click', function (event) {
            event.target.style.display = 'none';
            document.getElementById('container').style.display = 'inline-block';
        })
    }

    drowCard(source) {
        var card = document.createElement('IMG');
        document.getElementById('container').appendChild(card);
        card.setAttribute("src", source);
        View.addMouseOverAnimation(card, '1.05', '1');
    }
    static addMouseOverAnimation(card, over, out) {
        card.addEventListener('mouseover', View.initAnimation.bind(card, over));
        card.addEventListener('mouseout', View.initAnimation.bind(card, out));
    }
    static initAnimation(animationValue) {
        this.style.transform = 'scale(' + animationValue + ')';
    }
    addClickEvent() {
        var card = document.getElementsByTagName('img');
        for (var i = 0; i < 16; i++) {
            card[i].addEventListener('click', function (event) {
                event.target.classList.add('open');
                Controller.compareChoiseCard(document.querySelectorAll('.open'))
            });
        }
    }
    static equalCard(card) {
        card.classList.remove('open');
        card.style.visibility = 'hidden';
    }
    static notEqualCard(card) {
        card.classList.remove('open');
        card.style.transform = 'scale(1)';
    }
    static waitSecondCard(card) {
        card.style.transform = 'scale(1.1)';
        View.addMouseOverAnimation(card, '1.', '1.1');
    }
}
class Controller {
    constructor(view) {
        this.view = view;
    }
    createCollectionPaths() {
        Array.prototype.shuffle = function () {
            var i = this.length,
                j, temp;
            if (i == 0) return this;
            while (--i) {
                j = Math.floor(Math.random() * (i + 1));
                temp = this[i];
                this[i] = this[j];
                this[j] = temp;
            }
            return this;
        }
        this._array_paths = [];
        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                this._array_paths[i] = 'images/' + (i + 1) + '.png';
            } else {
                this._array_paths[i] = 'images/' + (i - 7) + '.png';
            }
        }
        return this._array_paths = this._array_paths.shuffle();
    }
    createCard() {
        var sourceCollection = this.createCollectionPaths();
        for (var i = 0; i < 16; i++) {
            this.view.drowCard(sourceCollection[i]);
        }
        this.view.buttonClick();
    }
    addEventToCard() {
        this.view.addClickEvent();
    }
    static compareChoiseCard(choiceCards) {
        if (choiceCards.length === 2) {
            if (choiceCards[0].src === choiceCards[1].src) {
                for (var i = 0; i < choiceCards.length; i++)
                    View.equalCard(choiceCards[i])
            } else {
                for (var i = 0; i < choiceCards.length; i++)
                    View.notEqualCard(choiceCards[i]);
            }
        }
        if (choiceCards.length === 1) {
            View.waitSecondCard(choiceCards[0]);
        }
    }
}
const myView = new View();
const myController = new Controller(myView);
myController.createCard();
myController.addEventToCard();
