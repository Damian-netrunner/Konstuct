
var tags = document.querySelectorAll(".filter-tag input");
var cards = document.getElementsByClassName("col-card ");
var prev = null;


// удалить

var cardsDemo = document.getElementsByClassName("sec-cards__item");
var modalDemo = document.getElementsByClassName("modal");
var modalCloseDemo = document.getElementsByClassName("modal__close");

for (var i = 0; i < cardsDemo.length; i++) {
    cardsDemo[i].addEventListener('click', function () {
        modalDemo[0].style.display = "block";
    });
}
try {
    modalCloseDemo[0].addEventListener('click', function () {
        modalDemo[0].style.display = "none";
    });
} catch(ignored) {}


function updateCardTagStyle(tagTitle) {
    document.querySelectorAll('.main__item').forEach((item) => {

        if ( tagTitle.toLowerCase() === 'all' ) {
            item.classList.remove('--not-selected');
            return;
        }

        const tags = item.querySelectorAll('.tag');
        const foundCard = tags.values().find((iitem) => { return iitem.innerHTML.toLowerCase().includes(tagTitle.toLowerCase()) });

        if ( foundCard ) {
            item.classList.remove('--not-selected');
        } else {
            item.classList.add('--not-selected');
        }
    })
}

// tag switch
for (var i = 0; i < tags.length; i++) {

    tags[i].addEventListener('change', function () {
        // (prev) ? console.log(prev.value): null;
        if (this !== prev) {
            prev = this;
        }
        filterCardsByTag(prev.value);

        updateCardTagStyle(prev.value);

    });
}


function filterCardsByTag(tag) {
    if (tag == "all") {
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.display = "block";
        }
        return;
    }

    for (var i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains(tag)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

//tippy

tippy('[data-tippy-content]');


