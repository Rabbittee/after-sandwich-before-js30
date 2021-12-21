# js 三明治後測

### 兔群成果

- [Alpha](https://rabbittee.github.io/after-sandwich-before-js30/alpha/js/)
- [cola](https://rabbittee.github.io/after-sandwich-before-js30/cola/)
- [奶卷](https://rabbittee.github.io/after-sandwich-before-js30/Recoil/dist/)
- [\凱文超強/](https://rabbittee.github.io/after-sandwich-before-js30/kevin/dist/)

#### 文件更新紀錄

`2021-12-21 14:45`: 新增三種資料格式文件說明，第四題需求變動

### 氣象資料

- [氣象局開放資料清單](https://opendata.cwb.gov.tw/dist/opendata-swagger.html?urls.primaryName=openAPI)
- [自動氣象站-氣象觀測資料格式](https://opendata.cwb.gov.tw/opendatadoc/DIV2/A0001-001.pdf)
- [自動雨量站-雨量觀測資料格式](https://opendata.cwb.gov.tw/opendatadoc/DIV2/A0002-001.pdf)
- [局屬氣象站資料格式](https://opendata.cwb.gov.tw/opendatadoc/DIV2/A0003-001.pdf)
- [預報 XML 產品預報因子欄位中文說明表](https://opendata.cwb.gov.tw/opendatadoc/MFC/D0047.pdf)
- [申請帳號取得 token](https://opendata.cwb.gov.tw/user/authkey)

### 上傳格式

請自行新增自己名字的資料夾<br>
merge 後 github page 應該會自動生成，路徑加上你的資料夾名稱可

> [ex. https://rabbittee.github.io/after-sandwich-before-js30/template/](https://rabbittee.github.io/after-sandwich-before-js30/template/)

內部使用框架不限 `原生` `react` `vue` `angular` `svelte` 等<br>
使用前端三寶者，可參考 [`template`](https://github.com/Rabbittee/after-sandwich-before-js30/tree/master/template) 資料夾中的檔案<br>
把 `answers` 這個 array 物件中的 item 取代成該題的答案<br>

> ps. 使用框架者請自行 build 出 index.html 之類的東西，供 github page 讀取

### GIT 操作教學

- [Git 基礎指令](https://hsiangfeng.github.io/git/20190615/1148594701/)
- [六角之前的免費 Git&GitHub 手冊](https://w3c.hexschool.com/git/cfdbd310)
- [如何發 PR 教學](https://hsiangfeng.github.io/git/20190615/4143994266/)
- [兔兔教 leetcode practice 上傳解法教學](https://hackmd.io/s3-6fhjWQPaBtvsBr1aTig?view)

<details>
  <summary style="font-size:1.2rem">hint</summary>
  <ol>
    <li>用promise 或 await 串接 fetch API</li>
    <li>用closure概念包裝API taken</li>
    <li>使用建構子函式（constructor function) 建立結果物件</li>
    <li>利用object getter 與 setter讓結果console.log時候自帶單位</li>
    <li>加 34 改用 class 改寫</li>
  </ol>
</details>
