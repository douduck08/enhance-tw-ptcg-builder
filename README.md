# 《寶可夢集換式卡牌遊戲》牌組構築工具強化

此工具目的是強化《寶可夢集換式卡牌遊戲 (PTCG)》中文官方網站的[牌組構築工具](https://asia.pokemon-card.com/tw/deck-build/)之功能，屬於針對PC版網頁製作的 Userscript 瀏覽器擴充。

* 從 Greasy Fork 下載：https://greasyfork.org/zh-TW/scripts/462558
* GitHub：https://github.com/douduck08/enhance-tw-ptcg-builder

## 由來
無意中發現了針對日本 PTCG 官方網站所設計的 chrome extension [初手わかる君＆ひと（り回）し君](https://chrome.google.com/webstore/detail/jagbjncmdoaajjnkhnlndldommboicni)。認為這是一個方便的工具，可惜卻不適用於中文版網站。

既然如此，就自己做一個吧！

## 簡介
此擴充針對中文版PTCG官網的牌組構築工具 [asia.pokemon-card.com/tw/deck-build/](https://asia.pokemon-card.com/tw/deck-build/) 設計，在 Chrome 瀏覽器上配合 [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 進行開發。

除了使用上述的環境執行，在任何 PC 網頁瀏覽器配合 Userscript 管理工具都能得到相同或相似的運作結果。

目前的功能有：
1. 輸入關鍵字後，按下 enter 即可搜尋
1. 調整搜尋結果的寬度
1. 拖曳調整牌組順序
1. 測試起手工具、測試運作工具

![preview1](https://raw.githubusercontent.com/douduck08/enhance-tw-ptcg-builder/master/img/preview1.jpg)

## 安裝步驟
1. 替網頁瀏覽器安裝一個 Userscript 管理工具，[Greasy Fork](https://greasyfork.org/zh-TW) 首頁有列出很多選項可以選擇。
1. 打開我的腳本 [下載頁面](https://greasyfork.org/zh-TW/scripts/462558)，點擊"安裝腳本"。
1. 前往PTCG官網的牌組構築工具，重新整理網頁後，有看到額外的工具列出現，代表安裝成功。
1. 未來可以透過管理工具直接更新腳本。

如果需要解除安裝或者暫時停止腳本，只要透過 Userscript 管理工具的功能操作即可，腳本並不會在電腦留下額外的檔案。

## 測試起手工具
隨機洗牌後，抽出 7 張手牌、6 張獎賞卡，以及第一回合會抽到的 1 張牌。

![preview2](https://raw.githubusercontent.com/douduck08/enhance-tw-ptcg-builder/master/img/preview2.jpg)

## 測試運作工具
一個單人的卡牌測試環境。
* 可以拖曳卡片，在場上的不同區域間移動。
* 點選牌庫選單，可以查看牌庫，取出任意卡片，或者進行重洗。
* 點選每個區域的標題，會顯示該區域可用的快速功能，包含 "放入牌庫並重洗"、"放入棄牌區" 等。

![preview3](https://raw.githubusercontent.com/douduck08/enhance-tw-ptcg-builder/master/img/preview3.jpg)

## 規劃中的更新
* 更多的備戰區，用於測試 無極汰那VMAX 牌組。
* 提供英文介面，支援非中文的其他亞洲區PTCG官網。