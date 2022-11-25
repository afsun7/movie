import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./SignIn.css";
import toast from "react-hot-toast";
import { Space, Spin } from "antd";
export default function SignIn() {
  //define consumer
  const value = useContext(UserContext);
  //function handel Loading

  //function handel form
  function handelForm(e) {
    e.preventDefault();
    const { username, passWord } = e.target.elements;
    // console.log(passWord.value);
    if (!(username.value && passWord.value)) {
      toast.error("Please fill the blanks", {
        style: { backgroundColor: "#eec932", color: "#000" },
      });
    } else {
      value.login(username.value, passWord.value);
      value.setLoading(true);
    }
  }
  //

  return (
    <div className="wrapper">
      <div className="content_signIn">
        <div className="login_page_wrapper">
          <form className="login_page_form" onSubmit={handelForm}>
            <div className="login_page_form_head">
              <h1 className="login_page_form_head_title">LOGIN</h1>
            </div>
            <div className="login_page_form_item">
              <label className="login_page_form_item_label" htmlFor="mobile">
                USERNAME:
              </label>
              <input
                className="login_page_form_item_input"
                type="tel"
                name="username"
                id="mobile"
                dir="ltr"
                autoComplete="off"
              />
            </div>
            <div className="login_page_form_item">
              <label className="login_page_form_item_label" htmlFor="passWord">
                PASSWORD:
              </label>

              <input
                className="login_page_form_item_input"
                type="passWord"
                name="passWord"
                id="mobile"
                dir="ltr"
                autoComplete="off"
              />
            </div>

            <div className="login_page_form_actions">
              <button type="submit" className="login_page_form_actions_submit">
                <span className="login_page__form__actions__submit__txt">
                  LOGIN
                </span>
              </button>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {value.loading ? (
                  <Space size="middle">
                    <Spin size="large" />
                  </Space>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
