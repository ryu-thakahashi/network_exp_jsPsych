1. Firebase のアカウント
2. firebase CLI のインストール (Windows)
   1. https://firebase.google.com/docs/cli?hl=ja
   2. cmd で npm -v して npm のバージョンが表示されることを確認
   3. [【Windows】Nodejs をインストールしよう](https://zenn.dev/kuuki/articles/windows-nodejs-install)
   4. npm install -g firebase-tools
3. firebase CLI のインストール (Mac)
   1. https://firebase.google.com/docs/cli?hl=ja
   2. curl -sL https://firebase.tools | bash
4. firebase login
5. firebase init
   1. 以下の２つを選択（矢印キーで移動、スペースで選択、エンターで確定）
      1. Hosting: Configure and deploy Firebase Hosting sites
      2. Realtime Database: Configure a Realtime Database and deploy rules
   2. Use an existing project を選択
   3. プロジェクトを選択
   4. public directory: dist を指定
   5. Configure as a single-page app (rewrite all urls to /index.html)? は y
   6. Set up automatic builds and deploys with GitHub? は n
