//добавляем контейнер, где будут размещаться картинки
function add_container() {
    container = document.getElementsByClassName('container')[0];
    container.style.height = '640px';
    container.style.width = '640px';
    container.style.marginLeft = 'auto';
    container.style.marginRight = 'auto';
    container.style.marginTop = '20px';
}

//создаем карточку с элементом img,  id_name - id карточки, source - осточник картинки
function add_card(id_name, source) {
    var card = container.appendChild(document.createElement('IMG'));
    card.setAttribute("src", source);
    card.id = id_name;
    card.className = 'item';
    card.style.height = '136px';
    card.style.width = '136px';
    card.style.padding = '2px';
    card.style.margin = '8px';
    card.style.border = '2px solid grey';
    card.style.display = 'inline-block';
    card.style.verticalAlign = 'center';
    card.style.textAlign = 'center';
    card.style.cursor = 'pointer';
}

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

//создаем массив путей к картинкам, где каждый0 путь встречается 2 раза, потом перемешиваем его
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


add_container();
//создаем массив путей cards
cards = create_card_item();

//добавляем элементы, прописывая путь картинки в каждой карточке
for (var i = 0; i < 16; i++) {
    add_card(i + 1, cards[i]);
}

mouse_over(cards);
choice_item();
