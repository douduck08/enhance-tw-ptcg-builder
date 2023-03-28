// ==UserScript==
// @name         中文 ptcg 牌組編輯強化
// @namespace    https://github.com/douduck08/enhance-tw-ptcg-builder
// @version      1.1.1
// @description  強化繁體中文 ptcg 官網牌組編輯功能
// @author       douduck08 (https://www.douduck08.com/)
// @license      MIT
// @match        https://asia.pokemon-card.com/*/deck-build/
// @match        https://asia.pokemon-card.com/*/deck-build/?*
// @require      https://code.jquery.com/jquery-3.4.1.slim.min.js
// @require      https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js
// ==/UserScript==

const styles = `
.toolkit-flexWrapper {
    display: flex;
    justify-content: center;
}

#toolkit {
    box-sizing: border-box;
    color: #222222;
    font-size: 16px;
    font-weight: bold;
    background-color: #efefef;
    align-items: center;
    padding: 8px;
    margin-bottom: 8px;
}
#toolkit > div > span {
    margin-right: 8px;
}
#toolkit > div.searchFromToolkit {
    width: 260px;
    margin-right: 20px;
    padding: 0 16px;
}
#toolkit > div.searchResultToolkit {
    margin-right: 8px;
    padding: 0 16px;
}
#toolkit > div.searchResultToolkit > button {
    width: 70px;
    height: 40px;
}
#toolkit > div.deckToolkit {
    width: 462px;
    padding: 0 16px;
}
#toolkit > div.deckToolkit > button {
    width: 110px;
}

button.close-button {
    width: 40px;
    height: 40px;
    margin: 2px;
    position: absolute;
}
div.ex-cardZone {
    border: 1px dashed #707070;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    padding: 4px;
    margin: 2px;
}
div.ex-cardZone > h3 {
    font-size: 1rem;
    text-align: center;
    background-color: #efefef;
}
div.ex-cards {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
img.ex-card {
    width: 76px;
    height: auto;
    margin: 4px;
}

#testStartupZone {
    box-sizing: border-box;
    margin-bottom: 8px;
}
div.startup-prizeZone {
    width: 294px;
}
div.startup-handZone {
    width: 378px;
}

#testPlayZone {
    box-sizing: border-box;
    margin-bottom: 8px;
}
div.play-cardZone {
    width: 196px;
    height: 200px;
}
div.play-viewZone {
    width: 396px;
    height: 200px;
}
div.play-handZone {
    width: 596px;
    min-height: 266px;
}
div.play-discardZone {
    width: 396px;
    min-height: 266px;
}
div.play-prizeZone {
    width: 186px;
    height: 404px;
}
div.play-deckZone {
    width: 996px;
    height: 404px;
}
div.play-deckMenu {
    width: 186px;
    height: 404px;
}
button.play-deckMenuButton1 {
    width: -webkit-fill-available;
    height: 40px;
    border: 1px solid #dedede;
    border-radius: 10px;
    background-color: #efefef;
    margin: 2px;
}
button.play-deckMenuButton2 {
    width: -webkit-fill-available;
    height: 40px;
    border: 1px solid #000000;
    border-radius: 10px;
    background-color: #000000;
    color: #ffffff;
    margin: 2px;
}

div.play-cards {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
}
div.play-card > img {
    width: 76px;
    height: auto;
}
div.play-card {
    z-index: 10;
    margin: 4px;
}
div.deck-cards {
    justify-content: left;
    overflow-y: scroll;
}

div.prize-cards {
    justify-content: left;
}
div.prize-cards > div {
    border: 1px solid #dedede;
    background-color: #efefef;
    border-radius: 4px;
}
div.prize-cards > div > img {
    visibility: hidden;
}

div.stack-cards > div:nth-of-type(4n+1) {
    margin-left: 4px
}
div.stack-cards > div:nth-of-type(4n+2) {
    margin-left: -48px;
}
div.stack-cards > div:nth-of-type(4n+3) {
    margin-left: -48px;
}
div.stack-cards > div:nth-of-type(4n) {
    margin-left: -48px;
}
div.stack-cards > div:nth-of-type(n+4) ~ div {
    margin-top: -75px;
}

div.view-cards  > div:nth-of-type(n+4) ~ div {
    margin-top: -75px;
}

div.discard-cards > div:nth-of-type(10n+1) {
    margin-left: 4px
}
div.discard-cards > div:nth-of-type(10n+2) {
    margin-left: -48px;
}
div.discard-cards > div:nth-of-type(10n+3) {
    margin-left: -48px;
}
div.discard-cards > div:nth-of-type(10n+4) {
    margin-left: -48px;
}
div.discard-cards > div:nth-of-type(10n+5) {
    margin-left: -48px;
}
div.discard-cards > div:nth-of-type(10n+6) {
    margin-left: -48px;
}
div.discard-cards > div:nth-of-type(10n+7) {
    margin-left: -48px;
}
div.discard-cards > div:nth-of-type(10n+8) {
    margin-left: -48px;
}
div.discard-cards > div:nth-of-type(10n+9) {
    margin-left: -48px;
}
div.discard-cards > div:nth-of-type(10n) {
    margin-left: -48px;
}
div.discard-cards  > div:nth-of-type(n+10) ~ div {
    margin-top: -75px;
}
`;

const toolkitDom = `
<div id="toolkit" class="toolkit-flexWrapper">
    <div class="searchFromToolkit"></div>    
    <div id="searchResultToolkit" class="searchResultToolkit">
        <span>搜尋結果</span>
        <button type="button" id="reduceColumn" class="button secondary">縮減</button>
        <button type="button" id="addColumn" class="button secondary">加寬</button>
    </div>
    <div class="deckToolkit">
        <button type="button" id="testStartup" class="button">測試起手</button>
        <button type="button" id="testPlay" class="button">測試運作</button>
    </div>
</div>
<div id="testStartupZone" class="toolkit-flexWrapper">
    <div class="ex-cardZone startup-prizeZone">
        <h3>獎賞卡</h3>
        <div id="startupPrize" class="ex-cards"></div>
    </div>
    <div class="ex-cardZone startup-handZone">
        <h3>手牌</h3>
        <div id="startupHand" class="ex-cards"></div>
    </div>
    <div class="ex-cardZone">
        <h3>抽牌</h3>
        <div id="startupDraw" class="ex-cards"></div>
    </div>
    <div>
        <button type="button" id="testStartupClose" class="button secondary close-button">X</button>
    </div>
</div>
<div id="testPlayZone" class="toolkit-flexWrapper">
    <div>
        <div class="ex-cardZone play-prizeZone">
            <h3>獎賞卡</h3>
            <div id="play-prize" class="play-cards prize-cards"></div>
        </div>
    </div>
    <div>
        <div id="play-deckZone" class="ex-cardZone play-deckZone">
            <h3>牌庫</h3>
            <div id="play-deck" class="play-cards deck-cards"></div>
        </div>
        <div id="play-battleZone-1" class="toolkit-flexWrapper">
            <div class="ex-cardZone play-cardZone">
                <h3>放逐區</h3>
                <div id="play-lost" class="play-cards stack-cards"></div>
            </div>
            <div class="ex-cardZone play-cardZone">
                <h3>競技場</h3>
                <div id="play-stadium" class="play-cards stack-cards"></div>
            </div>
            <div class="ex-cardZone play-cardZone">
                <h3>戰鬥場</h3>
                <div id="play-active" class="play-cards stack-cards"></div>
            </div>
            <div class="ex-cardZone play-viewZone">
                <h3>查看</h3>
                <div id="play-view" class="play-cards view-cards"></div>
            </div>
        </div>
        <div id="play-battleZone-2" class="toolkit-flexWrapper">
            <div class="ex-cardZone play-cardZone">
                <h3>備戰區A</h3>
                <div id="play-bench-a" class="play-cards stack-cards"></div>
            </div>
            <div class="ex-cardZone play-cardZone">
                <h3>備戰區B</h3>
                <div id="play-bench-b" class="play-cards stack-cards"></div>
            </div>
            <div class="ex-cardZone play-cardZone">
                <h3>備戰區C</h3>
                <div id="play-bench-c" class="play-cards stack-cards"></div>
            </div>
            <div class="ex-cardZone play-cardZone">
                <h3>備戰區D</h3>
                <div id="play-bench-d" class="play-cards stack-cards"></div>
            </div>
            <div class="ex-cardZone play-cardZone">
                <h3>備戰區E</h3>
                <div id="play-bench-e" class="play-cards stack-cards"></div>
            </div>
        </div>
        <div class="toolkit-flexWrapper">
            <div class="ex-cardZone play-handZone">
                <h3>手牌</h3>
                <div id="play-hand" class="play-cards"></div>
            </div>
            <div class="ex-cardZone play-discardZone">
                <h3>棄牌區</h3>
                <div id="play-discard" class="play-cards discard-cards"></div>
            </div>
        </div>
    </div>
    <div>
        <div class="ex-cardZone play-deckMenu">
            <h3>牌庫選單</h3>
            <div id="deckMenu-1">
                <button type="button" id="deckMenu-open" class="play-deckMenuButton1">查看牌庫</button>
                <button type="button" id="deckMenu-shuffle" class="play-deckMenuButton1">重洗牌庫</button>
                <button type="button" id="deckMenu-viewOne" class="play-deckMenuButton1">查看一張牌</button>
                <button type="button" id="deckMenu-drawOne" class="play-deckMenuButton2">抽一張牌</button>
            </div>
            <div id="deckMenu-2">
                <button type="button" id="deckMenu-close" class="play-deckMenuButton1">關閉並重洗</button>
                <button type="button" id="deckMenu-sort" class="play-deckMenuButton1">排序</button>
            </div>
        </div>
    </div>
    <div>
        <button type="button" id="testPlayClose" class="button secondary close-button">X</button>
    </div>
</div>
`;

let column = 4;

function updateSearchResultZone() {
    $('#searchResultToolkit').attr('style', 'width: ' + (118 * column + 26).toString() + 'px');
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
    let index = 0;
    for (let i = 0; i < deckListData.length; i++) {
        let count = deckListData[i].count;
        for (let j = 0; j < count; j++) {
            let card = {
                'cardIndex': i,
                'index': index
            };
            library.push(card);
            index += 1;
        }
    }
    return library;
}

function shuffle(array) {
    array.sort(function () {
        return (Math.round(Math.random()) - 0.5);
    });
    return array;
}

function clearStartupCards() {
    $('#startupHand').empty();
    $('#startupPrize').empty();
    $('#startupDraw').empty();
}

function setupStartupCards() {
    clearStartupCards();
    let deckListData = getDeckListData();
    let library = shuffle(createLibrary(deckListData))
    for (let i = 0; i < 14; i++) {
        const card = '<img src="' + deckListData[library[i].cardIndex].cardImage + '" class="ex-card">';
        if (i < 7) {
            $('#startupHand').append(card);
        } else if (i < 13) {
            $('#startupPrize').append(card);
        } else {
            $('#startupDraw').append(card);
        }
    }
}

const playCardListIds = [
    'play-deck', 'play-hand', 'play-prize', 'play-discard',
    'play-lost', 'play-stadium', 'play-active', 'play-view',
    'play-bench-a', 'play-bench-b', 'play-bench-c', 'play-bench-d', 'play-bench-e',
];

function clearPlayCards() {
    for (let i = 0; i < playCardListIds.length; i++) {
        $('#' + playCardListIds[i]).empty();
    }
}

function setupPlayCards() {
    clearPlayCards();
    let deckListData = getDeckListData();
    let library = shuffle(createLibrary(deckListData))
    for (let i = 0; i < library.length; i++) {
        const card = '<div class="play-card" data-index="' + library[i].index +
            '"><img src="' + deckListData[library[i].cardIndex].cardImage + '"></div>';
        if (i < 7) {
            $('#play-hand').append(card);
        } else if (i < 13) {
            $('#play-prize').append(card);
        } else {
            $('#play-deck').append(card);
        }
    }
}

function openPlayDeck() {
    $('#play-deckZone').show();
    $('#play-battleZone-1').hide();
    $('#play-battleZone-2').hide();
    $('#deckMenu-1').hide();
    $('#deckMenu-2').show();
}

function closePlayDeck() {
    $('#play-deckZone').hide();
    $('#play-battleZone-1').show();
    $('#play-battleZone-2').show();
    $('#deckMenu-1').show();
    $('#deckMenu-2').hide();
}

function sortPlayDeck() {
    let parent = $('#play-deck');
    let items = parent.children().sort(function (a, b) {
        let a_index = $(a).data('index');
        let b_index = $(b).data('index');
        return a_index > b_index ? 1 : -1;
    });
    parent.append(items);
}

function shufflePlayDeck() {
    let parent = $('#play-deck');
    let items = parent.children().sort(function () {
        return (Math.round(Math.random()) - 0.5);
    });
    parent.append(items);
}

$(document).ready(function () {
    let styleSheet = $('<style>').text(styles);
    $('head').append(styleSheet);
    $('body > main').prepend(toolkitDom);
    $('#testStartupZone').hide();
    $('#testPlayZone').hide();

    // Adjust search result zone width
    $('#reduceColumn').click(function () {
        column -= 1;
        column = Math.max(2, column);
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
            searchButton.trigger('click');
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
        $('#testStartupZone').show();
        $('#testPlayZone').hide();
    });
    $('#testStartupClose').click(function () {
        clearStartupCards();
        $('#testStartupZone').hide();
    });

    // Test play
    $('#testPlay').click(function () {
        setupPlayCards()
        closePlayDeck();
        $('#testPlayZone').show();
        $('#testStartupZone').hide();
    });
    $('#testPlayClose').click(function () {
        clearPlayCards();
        $('#testPlayZone').hide();
    });

    // Dech menu buttons in test play
    $('#deckMenu-open').click(function () {
        openPlayDeck();
    });
    $('#deckMenu-close').click(function () {
        closePlayDeck();
        shufflePlayDeck();
    });
    $('#deckMenu-drawOne').click(function () {
        $('#play-deck').children().first().detach().appendTo("#play-hand");
    });
    $('#deckMenu-viewOne').click(function () {
        $('#play-deck').children().first().detach().appendTo("#play-view");
    });
    $('#deckMenu-sort').click(function () {
        sortPlayDeck();
    });
    $('#deckMenu-shuffle').click(function () {
        shufflePlayDeck();
    });

    // Setup sortable list for test play
    for (let i = 0; i < playCardListIds.length; i++) {
        Sortable.create(document.getElementById(playCardListIds[i]), {
            group: 'play-cards',
            animation: 150
        });
    }
});