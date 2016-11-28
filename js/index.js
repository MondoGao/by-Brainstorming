"use strict"
window.onload = function() {
    bindControllerArea('back');
    bindControllerArea('front');
    bindBackCards();
    bingBackDialog();
    document.getElementById('btn-again').addEventListener("click", function(e) {
        e.preventDefault();
        resetBackCards();
        // document.getElementById('card-result').style.transform = "";
        toggleSection(e);
        // deleteCardResult();
    });
    fitScreen();
    window.onresize = fitScreen;
    document.getElementById('btn-discuss').addEventListener("click", function(e) {
        toggleLayout(e, document.getElementById('share-layout'));
    });
    document.getElementById('share-layout').addEventListener('click', function(e) {
        toggleLayout(e, document.getElementById('share-layout'));
    });
    document.getElementById('black-layout').addEventListener('click', function() {
        document.getElementById('share-layout').className =
        document.getElementById('dialog-layout').className =
        document.getElementById('black-layout').className = "hide";
    });
};

function preventDefault(ev) {
    ev.preventDefault()
}
function stopPropagation(ev) {
    // debugger;
    ev.stopPropagation()
}

var cardData = {
    time: [
        {
            name: '春',
            eng: 'Spring',
            words: ['鲜花','发芽','播种','成长','希望','新的开始']
        }, {
            name: '夏',
            eng: 'Summer',
            words: ['烈日', '酷热', '暑假', '西瓜', '空调', '汗水']
        }, {
            name: '秋',
            eng: 'Autumn',
            words: ['枫叶', '凉爽', '中秋节', '成熟', '金色', '富有']
        }
    ], thing: [
        {
            name: '仙人掌',
            eng: 'Cactus',
            words: ['生命力强', '沙漠', '玫瑰', '刺', '牛仔']
        }, {
            name: '雾霾',
            eng: 'Haze',
            words: ['模糊', '无所不在', '香水', '口罩', '新闻']
        }, {
            name: '可乐',
            eng: 'Cola',
            words: ['欢乐', '家庭', '喷射', '爆炸']
        }
    ], place: [
        {
            name: '机场',
            eng: 'AirPort',
            words: ['旅游', '等候', '行李', '离别', '咖啡馆']
        }, {
            name: '寺庙',
            eng: 'Temple',
            words: ['信仰', '虔诚', '宗教', '蜡烛', '闹鬼']
        }, {
            name: '健身房',
            eng: 'Gymnasium',
            words: ['决斗', '赞扬', '死亡', '汗水', '好身材']
        }
    ], people: [
        {
            name: '学生',
            eng: 'Student',
            words: ['假期', '情窦初开', '叛逆', '压力']
        }, {
            name: '亲人',
            eng: 'Relatives',
            words: ['无私', '支柱', '回馈', '血液', '团聚']
        }, {
            name: '外星人',
            eng: 'Alien',
            words: ['火星', '飞碟', '智能', '掠夺', '诡异']
        }
    ], event: [
        {
            name: '弹',
            eng: 'Bounce',
            words: ['手指', '钢琴', '震动', '橡胶', '高', '灵巧']
        }, {
            name: '发怒',
            eng: 'Anger',
            words: ['失控', '破碎', '火', '力量']
        }, {
            name: '翻',
            eng: 'Turn',
            words: ['隐藏', '真相', '不同']
        }
    ]
};

function resetBackCards() {
    var cardList = document.querySelector('.card-list');
    var cardLis = cardList.querySelectorAll('li:not(.empty)');
    var i;
    for (i = 0; i < cardLis.length; i++) {
        cardLis[i].className = 'empty';
        cardLis[i].removeChild(cardLis[i].querySelector('div'));
    }
}

function fitScreen() {
    var screenHeight = document.body.offsetHeight;
    var screenWidth = document.body.offsetWidth;
    var screenRatio = screenWidth/screenHeight;
    var paddingRatio = 375/600;
    if (screenRatio < 1 || screenWidth < 375) {
        document.querySelector('html').style.fontSize = screenWidth/10 +'px';
    } else {
        document.querySelector('html').style.fontSize = 37.5 + 'px';
    }
    // debugger
    document.body.addEventListener('touchmove', preventDefault);
    var secHeight1 = document.querySelectorAll("section")[0];
    var secHeight2 = document.querySelectorAll("section")[1];
    changeSecScroll(secHeight1);
    changeSecScroll(secHeight2);

    function changeSecScroll(sec) {
        if(sec.scrollHeight > screenHeight) {
            sec.addEventListener('touchmove', stopPropagation);
        } else {
            sec.removeEventListener('touchmove', stopPropagation);
        }
    }

    if(screenRatio > paddingRatio) {
        document.querySelectorAll('section')[0].style.paddingBottom =
        document.querySelectorAll('section')[1].style.paddingBottom = "0.2rem";
    } else {
        document.querySelectorAll('section')[0].style.paddingBottom =
        document.querySelectorAll('section')[1].style.paddingBottom = "0";
    }
}

function bingBackDialog() {
    document.getElementById('btn-start').addEventListener('click', function(e) {
        e.preventDefault();
        var lis = document.querySelector('.card-list').querySelectorAll('.card');
        if(lis.length < 1) {
            alert('至少选择一张卡片哦～');
            return;
        }
        toggleLayout(e, document.getElementById('dialog-layout'));
    });
    document.getElementById('dialog-cancel').addEventListener('click', function(e) {
        toggleLayout(e, document.getElementById('dialog-layout'));
    });
    document.getElementById('dialog-submit').addEventListener('click', startBrainstorm);
}

function startBrainstorm(e) {
    if(e) {
        e.preventDefault();
    }
    var lis = document.querySelector('.card-list').querySelectorAll('.card');
    var type = [];
    var typeNumber = {time:0,place:0,thing:0,people:0,event:0};
    var finalCards = {time:[],place:[],thing:[],people:[],event:[]};
    var finalCardsState = {time:[],place:[],thing:[],people:[],event:[]};
    document.getElementById('subject').innerText = document.querySelector('input').value || "无主题";
    var index;
    for(var i = 0; i < lis.length; i++) {
        var name = lis[i].className.substring(10);
        type.push(name);
        typeNumber[name]++;
        if(typeNumber[name] > cardData[name].length) {
            alert("没那么多同类别的词哦～请重试！");
            toggleLayout(e, document.getElementById('dialog-layout'));
            return;
        }
    }
    for(var i = 0; i < type.length; i++) {
        do {
             index = Math.floor(Math.random()*(cardData[type[i]].length));
        } while(finalCardsState[type[i]][index]);
        finalCardsState[type[i]][index] = true;
        var temp = finalCards[type[i]];
        temp[temp.length] = cardData[type[i]][index];
    }
    console.log(finalCards);
    var cardResult = document.getElementById('card-result');
    var template = document.getElementById('card');
    deleteCardResult();
    var div = template.content.querySelector('div');
    var img = div.querySelector('img'),
        eng = div.querySelector('small'),
        name = div.querySelector('header span'),
        words = div.querySelectorAll('p span');
    var k = 0;
    var order = [2,1,3,0,4];
    for(var item in finalCards) {
        for(var i = 0; i < finalCards[item].length; i++, k++) {
            img.src = "img\/icon\/" + finalCards[item][i].eng + ".svg";
            eng.innerHTML = finalCards[item][i].eng;
            name.innerHTML = finalCards[item][i].name;
            for(var j = 0; j < 6; j++) {
                words[j].innerHTML = finalCards[item][i].words[j] || "";
            }
            div.className = "card card-" + item;
            div.dataset.index = order[k];
            var clone = document.importNode(template.content, true);
            cardResult.appendChild(clone);
        }

    }
    toggleLayout(e, document.getElementById('dialog-layout'));
    toggleSection();
}
function deleteCardResult() {
    var cardResult = document.getElementById('card-result');
    var cards = cardResult.querySelectorAll('div');
    for(var i = 0; i < cards.length; i++) {
        cardResult.removeChild(cards[i]);
    }
}

function toggleLayout(e, ele) {
    if(e) {
        e.preventDefault();
    }
    if (ele.className !== "") {
        ele.className = "";
        document.getElementById('black-layout').className = "";
    } else {
        ele.className = "hide";
        document.getElementById('black-layout').className = "hide";
    }
}
function toggleSection(e) {
    if(e) {
        e.preventDefault();
    }
    var sec = document.querySelectorAll('section');

    if (document.body.dataset.index === "0") {
        document.body.dataset.index = 1;
        sec[0].style.transform = "translateX(-100%)";
        sec[1].style.transform = "translateX(-100%)";
    } else {
        document.body.dataset.index = 0;
        sec[0].style.transform = "translateX(0)";
        sec[1].style.transform = "translateX(0)";
    }
}

function bindBackCards() {
    var list = document.querySelector('.card-list');
    var cards = document.querySelectorAll('.card-back .card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", addToCardList);
    }
    function addToCardList() {
        var clone = this.cloneNode(true);
        clone.dataset.index = "";
        clone.addEventListener("click", deleteCardfromList);
        var li = list.querySelector('.empty');
        if(li) {
            li.appendChild(clone);
            // if(addToAnimation(clone)) ;
            setTimeout(function() {
                li.className = "";
            }, 20);
        }
    }
    function deleteCardfromList() {
        this.parentNode.className = "empty";
        setTimeout((function(_this){
            return function() {
                _this.parentNode.removeChild(_this);
            };
        })(this), 800);
    }
}


function bindControllerArea(dir) {
    var touchstartX;
    document.querySelector('.card-' + dir + ' .next').addEventListener("click", function() {
        changeCard.call(document.querySelector('.card-' + dir + ' .previous'), dir);
    });
    document.querySelector('.card-' + dir + ' .previous').addEventListener("click", function() {
        changeCard.call(document.querySelector('.card-' + dir + ' .next'), dir);
    });
    document.querySelector('.card-' + dir).addEventListener("touchstart", function(e) {
        touchstartX = e.touches[0].clientX;
    });
    document.querySelector('.card-' + dir).addEventListener("touchend", function(e) {
        var changedX = e.changedTouches[0].clientX - touchstartX;
        if(Math.abs(changedX) > 50) {
            if(changedX > 0)
                changeCard.call(document.querySelector('.card-' + dir + ' .next'), dir);
            else
                changeCard.call(document.querySelector('.card-' + dir + ' .previous'), dir);
        }
    });
}
function changeCard(dir) {
    var direct = this.className == 'controller-area next';
    var cards = document.querySelectorAll('.card-' + dir + ' .card');
    var flag = Math.floor((5 - cards.length)/2);
    if (direct) {
        for (var i = 0; i < cards.length; i++) {
            var outFlag = Number(cards[i].dataset.index) + 1 > (4 - flag);
            if (cards.length%2 === 0 && outFlag) {
                setTimeout((function(i) {
                    return function() {
                        cards[i].dataset.index = Number(cards[i].dataset.index) + 1;
                    }
                })(i),300);
            }
            cards[i].dataset.index = Number(cards[i].dataset.index) + 1 > (4 - flag) ? flag : (Number(cards[i].dataset.index) + 1);
        }
    } else {
        for (var i = 0; i < cards.length; i++) {
            var outFlag = Number(cards[i].dataset.index) - 1 < flag;
            if (cards.length%2 === 0 && outFlag) {
                setTimeout((function(i) {
                    return function() {
                        cards[i].dataset.index = Number(cards[i].dataset.index) - 1;
                    }
                })(i),300);
            }
            cards[i].dataset.index = Number(cards[i].dataset.index) - 1 < flag ? (4 - flag) : (Number(cards[i].dataset.index) - 1);
        }
    }
}
