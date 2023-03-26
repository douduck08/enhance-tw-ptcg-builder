// ==UserScript==
// @name         中文 ptcg 牌組編輯強化
// @namespace    http://www.douduck08.com/
// @version      1.0
// @description  強化繁體中文 ptcg 官網牌組編輯功能
// @author       douduck08 (https://github.com/douduck08)
// @license      MIT
// @match        https://asia.pokemon-card.com/tw/deck-build/
// @match        https://asia.pokemon-card.com/tw/deck-build/?*
// @require      https://code.jquery.com/jquery-3.4.1.slim.min.js
// @require      https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js
// ==/UserScript==

const toolkitMenuStyle = `
#toolkits {
    box-sizing: border-box;
    color: #222222;
    font-size: 16px;
    font-weight: bold;
    background-color: #efefef;
    align-items: center;
    padding: 8px;
    margin-bottom: 8px;
}
#toolkits > div > span {
    margin-right: 10px;
}
#toolkits > div.searchFromToolZone {
    width: 260px;
    margin-right: 20px;
    padding: 0 16px;
}
#toolkits > div.searchResultToolZone {
    margin-right: 8px;
    padding: 0 16px;
}
#toolkits > div.searchResultToolZone > button {
    width: 70px;
    height: 40px;
}
#toolkits > div.deckToolZone {
    width: 462px;
    padding: 0 16px;
}
#toolkits > div.deckToolZone > button {
    width: 110px;
}
`;

const startupStyle = `
#testStartupZone {
    height: 275px;
    margin-bottom: 8px;
}
#testStartupZone > div.startupZone {
    border: 1px dashed #707070;
    border-radius: 6px;
    height: 100%;
    padding: 4px;
    margin: 2px;
}
#testStartupZone > div.startupPrizeZone {
    width: 268px;
}
#testStartupZone > div > span {
    margin: 0 5px;
}
#testStartupZone > div > div > img.ex-card {
    width: 76px;
    height: auto;
    margin: 5px;
}
#testStartupZone > button {
    width: 70px;
    height: 40px;
    margin: 2px 10px;
}
`;

const toolkitsDom = `
<div id="toolkits" class="flexWrapper">
    <div class="deckToolZone">
        <button type="button" id="testStartup" class="button">測試起手</button>
        <!--<button type="button" id="testPlay" class="button">測試流程</button>-->
    </div>
    <div id="searchResultToolZone" class="searchResultToolZone">
        <span>搜尋結果</span>
        <button type="button" id="reduceColumn" class="button secondary">縮減</button>
        <button type="button" id="addColumn" class="button secondary">加寬</button>
    </div>
    <div class="searchFromToolZone">
    </div>
</div>
<div id="testStartupZone" class="flexWrapper">
    <button type="button" id="testStartupClose" class="button secondary">X</button>
    <div class="startupZone">
        <span>抽牌</span>
        <div id="testStartupDraw">
        </div>
    </div>
    <div class="startupZone">
        <span>手牌</span>
        <div id="testStartupHand">
        </div>
    </div>
    <div class="startupZone startupPrizeZone">
        <span>獎賞卡</span>
        <div id="testStartupPrize">
        </div>
    </div>
    <div style="width: 90px"></div>
</div>
`;

const styles = toolkitMenuStyle + startupStyle;
let column = 4;

function updateSearchResultZone() {
    $('#searchResultToolZone').attr('style', 'width: ' + (118 * column + 26).toString() + 'px');
    $('#searchResultZone').attr('style', 'width: ' + (118 * column + 26).toString() + 'px');
    $('#searchResultZoneCardContainer').attr('style', 'width: ' + (118 * column).toString() + 'px');
}

function getDeckListData() {
    let cards = $('#decklistZoneCardContainer > .card');
    let deckListData = [];
    for (let i = 0; i < cards.length; i++) {
        deckListData[i] = {
            'cardId': cards[i].dataset.cardId,
            'cardName': cards[i].dataset.cardName,
            'cardImage': $('img', cards[i]).attr('src'),
            'count': $('div', cards[i]).html()
        };
    }
    return deckListData;
}

function createLibrary(deckListData) {
    let library = [];
    for (let i = 0; i < deckListData.length; i++) {
        let count = deckListData[i].count;
        for (let j = 0; j < count; j++) {
            let card = {
                'cardIndex': i,
                'subId': j
            };
            library.push(card);
        }
    }
    return library;
}

function clearStartupCards() {
    $('#testStartupHand').empty();
    $('#testStartupPrize').empty();
    $('#testStartupDraw').empty();
}

function setupStartupCards() {
    clearStartupCards();
    let deckListData = getDeckListData();
    let library = shuffle(createLibrary(deckListData))
    for (let i = 0; i < 14; i++) {
        const card = '<img src="' + deckListData[library[i].cardIndex].cardImage + '" class="ex-card">';
        if (i < 7) {
            $('#testStartupHand').append(card);
        } else if (i < 13) {
            $('#testStartupPrize').append(card);
        } else {
            $('#testStartupDraw').append(card);
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}

$(document).ready(function () {
    let styleSheet = $("<style>").text(styles);
    $('head').append(styleSheet);
    $('body > main').prepend(toolkitsDom);
    $("#testStartupZone").hide();

    // Adjust search result zone width
    $('#reduceColumn').click(function () {
        column -= 1;
        column = Math.max(1, column);
        updateSearchResultZone();
    });
    $('#addColumn').click(function () {
        column += 1;
        updateSearchResultZone();
    });
    $('#searchResultContainer').on('DOMSubtreeModified', function () {
        updateSearchResultZone();
    });
    updateSearchResultZone();

    // Search cards when click enter at the input field
    const searchButton = $('#searchCardButton');
    $('#freeword').keyup(function (e) {
        if (e.which == 13) {
            searchButton.trigger("click");
        }
    });

    // Make deck list being sortable
    let decklistZoneCardContainer = document.getElementById('decklistZoneCardContainer');
    Sortable.create(decklistZoneCardContainer, {
        animation: 150
    });

    // Test startup
    $('#testStartup').click(function () {
        setupStartupCards();
        $("#testStartupZone").show();
    });
    $('#testStartupClose').click(function () {
        clearStartupCards();
        $("#testStartupZone").hide();
    });

    // Test play
    $('#testPlay').click(function () {

    });
});