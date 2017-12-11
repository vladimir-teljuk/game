class View {
    buttonClick() {
        var btn = document.getElementById('btn');
        btn.addEventListener('click', function (event) {
            event.target.style.display = 'none';
            document.getElementById('container').style.display = 'inline-block';
        })
    }
    drowCard(source) {
        var card = document.createElement('DIV');
        card.classList.add('card');
        var imgInCard = document.createElement('IMG');
        document.getElementById('container').appendChild(card).appendChild(imgInCard);
        imgInCard.setAttribute("src", source);

    }
    addClickEvent() {
        var card = document.getElementsByClassName('card');
        for (var i = 0; i < 16; i++) {
            card[i].addEventListener('click', function (event) {
                this.classList.add('open');
                Controller.compareChoiseCard(document.querySelectorAll('.open'))
            });
        }
    }
    static equalCard(card) {
        card.firstChild.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.classList.remove('open');
    }
    static notEqualCard(card) {
        card.firstChild.style.opacity = '0.5';
        setTimeout(function () {
            card.firstChild.style.opacity = '0';
        }, 500)
        card.classList.remove('open');
    }

    static choiseOneCard(card) {
        card.firstChild.style.opacity = '0.5';

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
            if (choiceCards[0].firstChild.src === choiceCards[1].firstChild.src) {
                for (var i = 0; i < choiceCards.length; i++)
                    View.equalCard(choiceCards[i])
            } else {
                for (var i = 0; i < choiceCards.length; i++)
                    View.notEqualCard(choiceCards[i]);
            }
        }
        if (choiceCards.length === 1) {
            View.choiseOneCard(choiceCards[0]);
        }
    }
}
const myView = new View();
const myController = new Controller(myView);
myController.createCard();
myController.addEventToCard();
