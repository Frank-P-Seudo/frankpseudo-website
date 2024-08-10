import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources: {
      en: {
        translation: {
         
         aboutMe: "About Me",
         aboutMe_para1a: "I am a ",
         aboutMe_para1_keyword1: "full-stack developer",
         aboutMe_para1b: " who low-key prefer working on the server side, but not because I have any unjustified snobbish attitude towards front-end development; it is solely on account of my subconsciousness's persistent refusal to remember how to centre a div and, more importantly, my horrible taste of colour. ",
         aboutMe_para1c: "(Exhibit A: the background colour of this webpage.)",
         aboutMe_para2a: "Before becoming a developer, I had spent a decade working as a ",
         aboutMe_para2_keyword1: "tech risk consultant",
         aboutMe_para2b: " in an accounting firm and then as an ",
         aboutMe_para2_keyword2: "internal auditor",
         aboutMe_para2c: " in a stock exchange, mind-numbing experiences that I blame for (i) my dead dry sense of humour, (ii) an unhealthy tendency to write lengthy sentences that apparently have an outlook on life too optimistic to end themselves, (iii) and a probably work-induced delusion that I could become a decent writer. Thanks to (iii), I did what the whole r/Writing subreddit told me to never, ever try at home: I quitted my day job and became a full-time writer. After one novel, a handful of shorts, and 50,000 more words of I-don't-know-where-it-is-going, the reality finally found its way to hit me and I decided to try something less soul-crushing but equally creative. It was then I stumbled upon ",
         aboutMe_para2d: " and started learning the dark magic of coding.",
         aboutMe_para3a: "Fast forward to six months later, after six CS50 courses and countless hours of FreeCodeCamp tutorials, I finally became a salaried software developer in May 2023. Since then I have written a few web applications that ",
         aboutMe_para3_keyword1: "help small and medium-sized enterprises",
         aboutMe_para3b: " streamline their sales operations and manage data. When I am not coding for work, I teach myself how to code video games.",
         aboutMe_para4a: "P.S. Did I mention I (used to) write? Click the book cover to check out the first satire I published. My wife likes to say she loves every page she read, which isn't saying much because she only read the acknowledgement page with her name in it. Anyway, if you do buy it, I swear on my first-born child that all the profit will go to a very, very poor dude.",
         firstLang: "中文",
         footerText_favicon: "Favicon from textstudio",
         footerText_react: "Made with React",
         home: "Home",
         portfolio: "Portfolio",
         projects: "Projects",
         project_title_cs50_commerce: "CS50 Assignment - Commerce",
         project_title_cs50_network: "CS50 Assignment - Network",
         project_title_cs50_rainmaker: "CS50 Assignment - Rainmaker",
         project_title_mangafreaker: "Backend Development Group Project - Manga Freaker",
         project_title_moz: "MOZ Reborn",
         project_title_mynews: "My News",
         project_title_salesassistant: "Corprio-SalesAssistant",
         project_title_shopify: "Corprio-Shopify",
         project_title_socialmediamarketer: "Corprio-SocialMediaMarketer",
         project_desc_cs50_commerce: "This is one of the assignments I submitted for CS50 Web Programming with Python and JavaScript. It is an eBay-like e-commerce website that allows users to list and bid. ",
         project_desc_cs50_rainmaker: "Rainmaker is my final project for CS50 Web Programming with Python and JavaScript. It is a weather gambling website that retrieves real-time weather data through Open-Meteo API.",
         project_desc_cs50_network: "Another CS50 assignment - it is a social media website that allows users to like/comment/follow.",
         project_desc_mangafreaker1: "Manga Freaker is the final project of an in-person backend development course I took back in early 2023. Unlike other 'school projects' presented here, it is a group project. My involvement was mainly with the front-end and the CRUD for manga titles. I can't remember exactly whose idea it was to include those spicy ads, wink-wink.",
         project_desc_mangafreaker2: "This is a full-fledged e-Commerce website that (1) supports site owner to maintain manga titles and users, and (2) allows normal users to bookmark, comment and purchase comics.",
         project_desc_moz_1: "MOZ was a popular trading card game when I grew up, so I chose to 'digitize' it as my first project.",
         project_desc_moz_2: "I started learning HTML, CSS and JavaScript on 2 Dec 2022 and uploaded this card game (beta version) to GitHub on 10 Mar 2023. Its graphics are quite rough, because at that time I hadn't even heard of Bootstrap or Tailwind CSS, but the game is fun as hell.",
         project_desc_moz_3: "Note: All the cards are in Chinese, so the demo video is in Cantonese only.",
         project_desc_mynews_1: "Do you want a news App that always remembers what kind of news you like to consume? This is your App. To use it, all you need is an API key from TheNewsAPI, which is FREE!",
         project_desc_salesassistant_1: "Corprio-SalesAssistant allows users to easily create sales orders and invoices by simply chatting with a bot that supports English and Chinese.",
         project_desc_salesassistant_2: "Although the App does NOT make use of any AI model, it is smart enough to help you find the right customer/inventory/product data. And since it makes use of Web Speech API, the bot can read out its dialogue to support visually impaired users.",
         project_desc_salesassistant_3: "To use this App, you must have created a company in Corprio.",
         project_desc_shopify_1: "This was the first App I built with .NET and jQuery. Its objective is to let users export their customer and product data from Corprio database to Shopify (or vice versa) with a simple click.",
         project_desc_shopify_2: "The App makes use of Shopify's GraphQL Admin API and webhooks to ensure the data are consistent across both platforms.",
         project_desc_shopify_3: "You must have a Shopify store and follow the in-App instructions to integrate Shopify with Corprio before performing data import/export.",
         project_desc_socialmediamarketer_1: "This App has two use cases: (1) let users publish posts / broadcast messages about their products to social media, and (2) help them handle sales inquiry with a chatbot.",
         project_desc_socialmediamarketer_2: "It makes use of LINE and Meta APIs so that it can read messages sent to the user's LINE channel / Facebook page / Instagram account and respond accordingly.",
         project_desc_socialmediamarketer_3: "To use this App, you must not only have created a company in Corprio, but also have either a LINE channel or a Facebook page.",
         project_demo_displayText: "Demo Video",
         project_repo_displayText: "GitHub",
         project_site_displayText_moz: "Play it now!",
         project_site_displayText_visit: "Check it out",
         secondLang: "日本語",
         skills: "Skills",
         tab_title_dotnet: ".NET Projects",
         tab_title_game: "Game Projects",
         tab_title_pet: "Pet Projects",
         tab_title_school: "'School Projects'",
         tab_desc_dotnet1: "Below are the web applications I built on my first developer job. ",
         tab_desc_dotnet2: "You may notice that all of their names start with the word 'Corprio' and wonder what it is. Basically, Corprio is a web App store where business users can subscribe to the services that suit their unique operation needs, and the Apps I developed are made available there.",
         tab_desc_game: "This list is still growing very slowly. Will include more when I get a better hang of Unity.",
         tab_desc_pet: "Included below are tools/programs that I thought were good ideas at the time I wrote them.",
         tab_desc_school: "These are what I like to call 'school projects' because they were the assignments I submitted for CS50 courses and a backend development training programme.",
        }
      },
      zh: {
        translation: {
          aboutMe: "自我介紹",
          aboutMe_para1a: "您好，在下是一名洋人口中的 ",
          aboutMe_para1_keyword1: "full-stack developer",
          aboutMe_para1b: "。但如果我可以選擇專注於前端或後端開發，我會選擇後者。不不不。我對前端開發沒有不尊重的意思。我這麼說是因為我的潛意識一直拒絕記住如何讓 div 居中。更重要的是，我對顏色的品味太糟糕了。",
          aboutMe_para1c: "(證據編號 001：本網頁的背景顏色。)",
          aboutMe_para2a: "在我加入軟件開發這個行業之前的十年間，我在一家會計師事務所的諮詢服務部當過所謂的",
          aboutMe_para2_keyword1: "顧問",
          aboutMe_para2b: "，又在一家交易所做過",
          aboutMe_para2_keyword2: "內部審計",
          aboutMe_para2c: "。有一天，我忽然忘記了我身處這個城市的核心價值 ── 搵食 ── 而辭掉工作開始寫書。在寫了一點五本小說之後，我終於不甘不願地接受了自己不適合寫作這個現實。這時，我偶然發現了 ",
          aboutMe_para2d: " 這個 YouTube 頻道，並從此入了編程這個坑。",
          aboutMe_para3a: "六個月後，我找到了一份軟體開發的工作。到目前為止，我編寫了幾個",
          aboutMe_para3_keyword1: "支援中小企",
          aboutMe_para3b: "的應用程式。工餘時，我會自學編寫電子遊戲。",
          aboutMe_para4a: "容許我打個廣告：附圖是拙作的封面。它現正在 Amazon 上「公開熱賣」。所有這本書的銷售收益都會捐到一個非常失敗的自資出版作家。",
          firstLang: "English",
          footerText_favicon: "Favicon from textstudio",
          footerText_react: "Made with React",
          home: "首頁",
          portfolio: "項目",
          projects: "項目",
          project_title_cs50_commerce: "CS50 作業 - Commerce",
          project_title_cs50_network: "CS50 作業 - Network",
          project_title_cs50_rainmaker: "CS50 作業 - Rainmaker",
          project_title_mangafreaker: "後端開發課程小組作業 - Manga Freaker",
          project_title_moz: "MOZ Reborn",
          project_title_mynews: "My News",
          project_title_salesassistant: "Corprio-SalesAssistant",
          project_title_shopify: "Corprio-Shopify",
          project_title_socialmediamarketer: "Corprio-SocialMediaMarketer",
          project_desc_cs50_commerce: "這是我為哈佛大學的「CS50 Web Programming with Python and JavaScript」提交的作業之一。它是一個類似eBay的電子商務網站，允許用戶出標價和投標。 ",
          project_desc_cs50_rainmaker: "Rainmaker 是我的「CS50 Web Programming with Python and JavaScript」的期末專案作業。這是一個天氣賭博網站，人們可以投注某個地方在某個時間是否會下雨。它透過 Open-Meteo API 檢索即時天氣資料。",
          project_desc_cs50_network: "另一個 CS50 的作業 — 它是一個類似 X/Twitter 的網站，允許用戶按讚/評論/追蹤。",
          project_desc_mangafreaker1: "Manga Freaker 是我在 2023 年初參加的後端開發課程的期末小組作業。我主要負責漫畫的 CRUD 功能和前端。",
          project_desc_mangafreaker2: "這是一個相當全面的電子商務網站，(1) 支援網站管理員維護漫畫和用戶數據，(2) 允許普通用戶添加書籤、評論和購買漫畫。",
          project_desc_moz_1: "MOZ召喚王 是我小時候流行的集換式卡牌遊戲，而我選擇將其「數位化」作為我的第一個編程項目。",
          project_desc_moz_2: "我於2022年12月2日開始學習HTML、CSS和JavaScript，並於2023年3月10日將這款紙牌遊戲（測試版）上傳到GitHub。這個遊戲的使用者介面相當粗糙，因為當時我甚至沒有聽說過 Bootstrap 或 Tailwind CSS，但它還是非常有趣。",
          project_desc_moz_3: "",
          project_desc_mynews_1: "這應用程式基本上是一個能記住您搜尋偏好、但不使用cookie的 Google/Yahoo News。要使用它，您只需從 TheNewsAPI 獲取一個免費的 API key。",
          project_desc_salesassistant_1: "Corprio-SalesAssistant 讓用戶可以透過與聊天機器人交談而輕鬆地創建銷售訂單和發票。",
          project_desc_salesassistant_2: "儘管該應用程式沒有使用任何人工智能模型，但它並不太愚蠢，可以幫助您找到正確的客戶/庫存/產品數據。由於它使用 Web Speech API，因此機器人可以讀出對話來支援視障用戶。",
          project_desc_salesassistant_3: "要使用此應用程式，您必須先在 Corprio 創建一家公司。",
          project_desc_shopify_1: "這是我第一個使用 .NET 和 jQuery 建立的應用程式。其目標是讓用戶輕易地將其客戶和產品資料從 Corprio 資料庫匯出到 Shopify（反之亦然）。",
          project_desc_shopify_2: "該應用程式利用 Shopify 的 GraphQL Admin API 和 Webhook 來確保 Shopify 和 Corprio 兩個平台上的資料同步。",
          project_desc_shopify_3: "要使用此應用程式執行資料匯入/匯出，您必須擁有一家 Shopify 商店，並按照應用程式內的說明將 Shopify 與 Corprio 綁綁。",
          project_desc_socialmediamarketer_1: "該應用程式有兩個用例：(1) 讓用戶只需要輕輕一 click 即可在社群媒體上發布有關其產品的貼文/廣播訊息，(2) 使用聊天機器人幫助他們處理銷售查詢。",
          project_desc_socialmediamarketer_2: "這應用程式利用 LINE 和 Meta 的 API 以讀取發送到用戶的 LINE 頻道/Facebook 專頁/Instagram 帳戶的訊息並做出相應的回應。",
          project_desc_socialmediamarketer_3: "要使用此應用程式，除了先在 Corprio 創建一家公司，您需要有一個 LINE 頻道或 Facebook 專頁。",
          project_demo_displayText: "示範影片",
          project_repo_displayText: "GitHub",
          project_site_displayText_moz: "試玩",
          project_site_displayText_visit: "訪問",
          secondLang: "日本語",
          skills: "技能",
          tab_title_dotnet: ".NET 項目",
          tab_title_game: "遊戲項目",
          tab_title_pet: "Side Projects",
          tab_title_school: "「功課」",
          tab_desc_dotnet1: "以下是我在第一份開發人員工作中建立的應用程式。",
          tab_desc_dotnet2: "您可能會好奇為什麼它們的 GitHub repo 名稱都以「Corprio」一詞開頭。基本上，Corporio 是一個網路應用程式商店，企業用戶可以在其中訂閱適合其獨特營運需求的服務，而我開發的應用程式也可以在那裡找到。",
          tab_desc_game: "當我更好地掌握 Unity 後，更多項目將添加到此列表中。",
          tab_desc_pet: "以下是我忽發奇想寫下的工具和程式。",
          tab_desc_school: "我稱這些項目為「功課」，因為它們是我為哈佛CS50和ERB後端開發課程提交的作業。",
        }
      },
      ja: {
        translation: {
          aboutMe: "紹介",
          aboutMe_para1a: "私は",
          aboutMe_para1_keyword1: "フルスタック開発者",
          aboutMe_para1b: "です。私の最大の興味は物を作ることです。私の最大の弱点は、いつも自分のウェブサイトに最悪の色を選択します。",
          aboutMe_para1c: "証拠： このウェブサイトの背景色を見てください。",
          aboutMe_para2a: "開発者になる前は会計事務所で",
          aboutMe_para2_keyword1: "コンサルタント",
          aboutMe_para2b: "として働き、その後証券取引所で",
          aboutMe_para2_keyword2: "内部監査人",
          aboutMe_para2c: "として働きました。さらに、かつて小説を書いて出版したことがあります。しばらく書いているうちに、自分は文章を書くのが得意ではないことに気づきました。そんなとき、YouTube チャンネル ",
          aboutMe_para2d: " に出会い、プログラミングを学び始めました。",
          aboutMe_para3a: "6か月の学習後, 私は給与を得るソフトウェア開発者になりました。私が作成した アプリケーションは、",
          aboutMe_para3_keyword1: "中小企業",
          aboutMe_para3b: "をサポートしています。",
          aboutMe_para4a: "追記：私の下手な日本語についてお詫びします。より正確な紹介については、英語版をお読みください。また、私の書いた本に興味がございましたら、本の表紙画像をクリックしてください。",          
          firstLang: "English",
          footerText_favicon: "Favicon from textstudio",
          footerText_react: "Made with React",
          home: "ホーム",
          portfolio: "ポートフォリオ",
          projects: "プロジェクト",
          project_title_cs50_commerce: "CS50宿題 - Commerce",
          project_title_cs50_network: "CS50宿題 - Network",
          project_title_cs50_rainmaker: "CS50宿題 - Rainmaker",
          project_title_mangafreaker: "バックエンド開発グループプロジェクト - Manga Freaker",
          project_title_moz: "MOZ Reborn",
          project_title_mynews: "僕のニュース",
          project_title_salesassistant: "Corprio-SalesAssistant",
          project_title_shopify: "Corprio-Shopify",
          project_title_socialmediamarketer: "Corprio-SocialMediaMarketer",
          project_desc_cs50_commerce: "これは、ハーバード大学の「CS50 Web Programming with Python and JavaScript」に私が提出した課題です。これは、ユーザーが出品して入札できる eBay のような電子商取引ウェブサイトです。",
          project_desc_cs50_rainmaker: "Rainmaker は、ハーバード大学の「CS50 Web Programming with Python and JavaScript」の最後のプロジェクトです。これは、Open-Meteo の API を通じて実時間な気象データを取得する気象ギャンブル Web サイトです。",
          project_desc_cs50_network: "これもCS50の課題です。これは、X/Twitter のようなソーシャルメディアのウェブサイトです。",
          project_desc_mangafreaker1: "Manga Freaker は、2023 年の初めに私が受講したグループバックエンド開発コースの最後のプロジェクトです。私は、漫画維持の機能とフロントエンドを担当しました。",
          project_desc_mangafreaker2: "これは、(1) サイト運営者による漫画とユーザーの維持をサポートし、(2) 一般ユーザーがブックマークやコメント、漫画の購入ができる本格的な電子商取引サイトです。",
          project_desc_moz_1: "『大貝獣物語ザ・ミラクル オブ ザ・ゾーン』（MOZ）は私が子供の頃人気のカードゲームだったので、最初のプロジェクトとして選びました。",
          project_desc_moz_2: "私は 2022 年 12 月 2 日に HTML、CSS、JavaScript の学習を開始し、2023 年 3 月 10 日にこのカードゲーム (ベータ版) を GitHub にアップロードしました。当時は Bootstrap や Tailwind CSS のことさえ聞いていなかったので、グラフィックはかなり荒いです。しかし、ゲームはまだとても楽しいです。",
          project_desc_moz_3: "注: すべてのカードは中国語で書かれているため、デモビデオは広東語のみです。",
          project_desc_mynews_1: "このアプリは、あなたの好みに応じてニュースを提供します。これを使用するには、TheNewsAPI から無料の API キーを取得するだけです。",
          project_desc_salesassistant_1: "Corprio-SalesAssistant を使用すると、ユーザーは英語と中国語を話すボットとチャットするだけで、受注書や請求書を簡単に作成できます。",
          project_desc_salesassistant_2: "このアプリは、AI モデルを利用していませんが、適切な顧客/在庫/製品データを見つけるのに役立ちます。さらに、Web Speech API を利用するので、視覚障害のあるユーザーに支援を提供します。",
          project_desc_salesassistant_3: "このアプリを使用するには、Corprio で会社を設立している必要があります。",
          project_desc_shopify_1: "これは、.NET と jQuery を使用して構築した最初のアプリでした。このアプリを使用すると、ユーザーは簡単なクリックで顧客データと製品データを Corprio データベースから Shopify にアップロードできます。",
          project_desc_shopify_2: "このアプリは Shopify の GraphQL Admin API と Webhook を利用して、Corrio と Shopify 全体でデータの一貫性を確保します。",
          project_desc_shopify_3: "このアプリを使用するには、Shopify ストアがある必要があります。",
          project_desc_socialmediamarketer_1: "このアプリには 2 つの目的があります。(1) ユーザーが LINE、Facebook、Instagram を通じて自社商品に関するニュースを配信できるようにします。(2) チャットボットを使用して販売に関する問い合わせに対応します。",
          project_desc_socialmediamarketer_2: "LINE API と Meta API を利用しています、このアプリはユーザーに代わってメッセージを読んで応答することができます。",
          project_desc_socialmediamarketer_3: "このアプリを使用するには、Corprio で会社を設立し、LINE チャンネルや Facebook ページを持っている必要があります。",
          project_demo_displayText: "デモビデオ",
          project_repo_displayText: "GitHub",
          project_site_displayText_moz: "プレー",
          project_site_displayText_visit: "訪問",
          secondLang: "中文",
          skills: "スキル",
          tab_title_dotnet: ".NET プロジェクト",
          tab_title_game: "ゲーム・プロジェクト",
          tab_title_pet: "サイドプロジェクト",
          tab_title_school: "「宿題」プロジェクト",
          tab_desc_dotnet1: "以下は、私が最初の開発者の仕事で構築したアプリケーションです。",
          tab_desc_dotnet2: "",
          tab_desc_game: "このリストは、Unity のスキルが向上した後に拡張されます。",
          tab_desc_pet: "以下は、自分で使用するために書いたプログラムです。",
          tab_desc_school: "これは私がプログラミングコースに提出した宿題でした。",
        }
      },
    }
  });

  export default i18next;