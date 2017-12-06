class View {

    constructor(controller) {
        this.controller = controller;
    }


    drowCard(source) {
        var card = document.createElement('IMG');
        document.getElementById('container').appendChild(card);
        card.setAttribute("src", source);
        card.addEventListener('mouseover', this.initAnimation.bind(card, '1.05'));
        card.addEventListener('mouseout', this.initAnimation.bind(card, '1'));
    }

    initAnimation(animationValue) {
        this.style.transform = 'scale(' + animationValue + ')';
    }

    addClickEvent() {
        var card = document.getElementsByTagName('img');
        for (var i = 0; i < 16; i++) {
            var that = this;
            card[i].addEventListener('click', function (event) {
                event.target.classList.add('open');
                that.controller.compareChoiseCard(document.getElementsByClassName('open'))
            });
        }
    }

    hiddenCard(card) {
        card.style.visibility = 'hidden';
        card.classList.remove('open');
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

    addCard() {
        var sourceCollection = this.createCollectionPaths();
        for (var i = 0; i < 16; i++) {
            this.view.drowCard(sourceCollection[i]);
        }

    }
    addEventToCard() {
        this.view.addClickEvent();
    }

    compareChoiseCard(choiceCards) {
        if (choiceCards.length === 2) {
            if (choiceCards[0].src === choiceCards[1].src) {
                for (var i = 0; i < choiceCards.length; i++)
                    this.view.hiddenCard(choiceCards[i])
            }
        }
    }
}

const myController = new Controller(new View());
const myView = new View(new Controller());
myController.addCard();
myController.addEventToCard();
