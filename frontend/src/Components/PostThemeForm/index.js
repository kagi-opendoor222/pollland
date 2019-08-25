import React from "react";

const PostThemeForm = () => {
  return(
    <div>
      <div className="theme-title">
        投票テーマ作成フォーム
      </div>
      <form className="theme-create-form">
        <label htmlFor="theme-create-form__input-theme-name">投票テーマ入力</label>
        <input type="text" className="theme-create-form__input-theme-name" />

        <div className="input-group-boards">
          <div className="input-group-board">
            <label htmlFor="theme-create-form__input-group-name">解答</label><br />
            <input type="text" className="theme-create-form__input-group-name" placeholder="例：犬派" /><br />
            <label htmlFor="theme-create-form__input-group-message">メッセージ</label>
            <textarea className="theme-create-form__input-grpup-message" placeholder="例：かわいい" /><br />
            <label>画像</label><br />
            <input type="file" />
          </div>
        </div>

        <label>
          <div className="theme-create-form__submit"><span>作成！</span></div>
          <input type="submit" style={{display: "none"}} />
        </label>
      </form>
    </div>
  )
}

export default PostThemeForm;