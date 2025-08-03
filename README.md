# 📚 English Grammar Learning App

**GitHub Pages URL:** [https://naru18vr.github.io/english-grammar-learning-app/](https://naru18vr.github.io/english-grammar-learning-app/)

---

## ✅ 現在の状態
- ✅ GitHub Pages にデプロイ済み（`gh-pages` ブランチ）
- ✅ GitHub Actions (deploy.yml) が正常動作中
- ✅ `vite.config.ts` に `base` 設定済み（白画面問題解決済み）
- ✅ `main` ブランチに push するだけで自動更新される

---

## 🚀 変更を加えたいときの手順

### 1️⃣ VS Code で正しいフォルダを開く
- 📂 `english-grammar-learning-app`
- VS Code 左上に **english-grammar-learning-app** と出ているか確認
- ターミナルも `PS D:\myprojects\english-grammar-learning-app>` になっているか確認

### 2️⃣ コードを編集する
- `src` 内のファイルを変更（例: 画面デザイン、機能追加）

### 3️⃣ GitHub に反映（3ステップ）
```powershell
git add .
git commit -m "変更内容を書く"
git push
```

---

## ⚠ 注意点
- **vite.config.ts の base は絶対に消さない！**
  ```js
  base: '/english-grammar-learning-app/',
  ```
- **違うフォルダ（例: reading-training-app）で作業しない**
- **GitHub Actions が赤❌になったら Actions タブのログを見る**

---

## 🏁 プロジェクトゴール
- `git push` するだけで公開ページが自動更新される  
- 以降は **アプリ開発（デザイン変更や機能追加）に集中できる！**
