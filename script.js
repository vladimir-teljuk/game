//функция, чтобы перемешать массив
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
    constructor(id_name, source) {
        this._id_name = id_name;
        this._source = source;
    }
    
    add_card_to_page(id_name, source) {
    var card = document.getElementById('container').appendChild(document.createElement('IMG'));
    card.setAttribute("src", this._source);
    card.id = this._id_name;
    card.className = 'item';
    }
}


//создаем массив путей к картинкам, где каждый путь встречается 2 раза, потом перемешиваем его
function create_card_item() {
    var item_array = [];
    for (var i = 0; i < 16; i++) {

        if (i < 8) {
            item_array[i] = 'images/' + (i + 1) + '.png';
        } else {
            item_array[i] = 'images/' + (i - 7) + '.png';
        }

    }
    return shuffle_array = item_array.shuffle();
}

//добавляем анимацию на событие наведение мыши на карточку, elements - элементы, которые реагтируют на события
function mouse_over(elements) {
    elements = document.querySelectorAll('.item');
    for (i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mouseover', function (event) {
            event.target.style.transform = 'scale(1.05)';
        });
        elements[i].addEventListener('mouseout', function (event) {
            event.target.style.transform = 'scale(1)';
        });
    }
}

//скрываем выбраные карточки, если выбраных карточек две и путь к картинке одинаковый. 
//Если выбрана 1 карточка, фиксируем ее у выбраном положении и ждем когда выберем вторую
//selected_cards - коллекция карточек, которые мы нажали
function hidden_card(selected_cards) {
    if (selected_cards.length === 2) {
        if (selected_cards[0].src === selected_cards[1].src) {
            for (var i = 0; i < selected_cards.length; i++) {
                selected_cards[i].style.visibility = 'hidden';
                selected_cards[i].classList.remove('open');
            }
        } else {
            for (var i = 0; i < selected_cards.length; i++) {
                selected_cards[i].classList.remove('open');
                selected_cards[i].style.transform = 'scale(1)';
                mouse_over(selected_cards);
            }
        }

    }
    if (selected_cards.length === 1) {
        selected_cards[0].style.transform = 'scale(1.12)';
        selected_cards[0].addEventListener('mouseover', function (event) {
            event.target.style.transform = 'scale(1.12)';
        });
        selected_cards[0].addEventListener('mouseout', function (event) {
            event.target.style.transform = 'scale(1.12)';
        });
    }
}

/*устанавлием действия на события нажатия на карточку.
  добавляем класс open к карточке и у функции hidden_card идет проверка, 
  какая по счету карточка выбрана и одинаковый ли путь к картинке*/
function choice_item() {
    var items = document.querySelectorAll('.item');
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function (event) {
            event.target.classList.add('open');
            hidden_card(document.querySelectorAll('.open'));
        });
    }
}

//создаем массив путей cards
cards = create_card_item();

//добавляем элементы, прописывая путь картинки в каждой карточке
for (var i = 0; i < 16; i++) {
    var card = new Card(i + 1, cards[i]);
    card.add_card_to_page(i + 1, cards[i]);
}

mouse_over(cards);
choice_item();
