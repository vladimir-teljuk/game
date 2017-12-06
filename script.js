/*/функция, чтобы перемешать массив
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

class Card {
    constructor(source) {
        this._source = source;
        this._card = document.createElement('IMG');
        this._card.setAttribute("src", source);
        this._className = undefined;

    }

    get Source() {
        return this._source;
    }

    get ClassName() {
        return this._className;
    }

    set ClassName(open) {
        this._className = open;
    }

    initAnimation(animationValue) {
        this._card.style.transform = 'scale(' + animationValue + ')';
    }

    drow_card() {
        document.getElementById('container').appendChild(this._card);
        this._card.addEventListener('mouseover', this.initAnimation.bind(this, '1.05'));
        this._card.addEventListener('mouseout', this.initAnimation.bind(this, '1'));
    }

    hidden_card() {
        this._card.style.visibility = 'hidden';
        this.ClassName = undefined;
    }


}



class CardCollection {
    _create_array_paths() {
        this._array_paths = [];
        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                this._array_paths[i] = new Card('images/' + (i + 1) + '.png');
            } else {
                this._array_paths[i] = new Card('images/' + (i - 7) + '.png');
            }
        }
        return this._array_paths = this._array_paths.shuffle();
    }

    drow_all_cards() {
        this._create_array_paths();
        this._array_paths.forEach(function (card, i, _array_paths) {
            card.drow_card();
        });

    }

    choice_card() {
        var clickCard = [];
        var j = 0;
        for (var i = 0; i < 16; i++) {
            var copyThis = this._array_paths[i];
            this._array_paths[i]._card.addEventListener('click', function (event) {
                copyThis.ClassName = 'open';
                console.log(copyThis);
                clickCard[j] = copyThis;
                if (clickCard.length === 2 && clickCard[0].Source === clickCard[1].Source) {
                    clickCard[0].hidden_card();
                    clickCard[1].hidden_card();
                }
                j++;
            });
        }
    }
}


var cardCollection = new CardCollection();
cardCollection.drow_all_cards();
cardCollection.choice_card();
