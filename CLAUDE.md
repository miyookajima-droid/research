# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

バニラHTML/CSS/JavaScriptで構築されたシンプルなToDoアプリ。ビルドツール・フレームワーク不使用。

## 開き方

```bash
xdg-open index.html
```

またはブラウザで直接 `index.html` を開く。

## アーキテクチャ

3ファイル構成：

- **`index.html`** — DOM構造のみ。ロジックなし。
- **`style.css`** — すべてのスタイル。IDセレクタ（`#todo-form`, `#todo-list` 等）とクラス（`.todo-item`, `.done`）で管理。
- **`app.js`** — すべてのロジック。`todos` 配列をインメモリで保持し、変更のたびに `localStorage` へ保存、`render()` で全リストを再描画する。

### データフロー

`todos` 配列（`{ text: string, done: boolean }[]`）が唯一の状態。操作（追加・完了切替・削除）はすべて配列を変更 → `save()` → `render()` の順で実行される。
