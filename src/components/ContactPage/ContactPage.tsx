import { useEffect, useRef, useState } from "react";
import { BoxesLoader } from "react-awesome-loaders";
import "./index.scss";
import "animate.css";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { AnimatedLetters } from "../HomePage/animatedLetters";
const DIV = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LABEL = styled.label`
  display: block;
`;
const INPUT = styled.input`
  width: 100%;
  background-color: rgba(10, 56, 107, 0.568);
  border: none;
  border-radius: 15px;
  padding: 10px;
  color: white;
  &.button {
    color: rgb(108, 174, 250);
  }
  &::placeholder {
    padding: 5px 10px;
    color: rgb(30 67 108);
  }
`;
const TEXTAREA = styled.textarea`
  width: 100%;
  background-color: rgba(10, 56, 107, 0.568);
  border: none;
  border-radius: 15px;
  color: white;
  padding: 10px;
`;

const BOTTOMDIV = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 1050px) {
    overflow: visible;
  }
`;

const PARA = styled.p`
  padding-top: 20px;
  font-size: 22px;
  &.redPara {
    color: red;
  }
  &.orangePara {
    color: rgb(240, 144, 83);
    font-style: italic;
  }
`;

const FIRSTDIV = styled.div`
  width: 70%;
  margin: 0 auto;
  position: relative;
  z-index: 100;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const BTN = styled.button`
  &:hover {
    box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
  }
`;
export const ContactPage = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [loader, setLoader] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const form = useRef(null);
  const { ref, inView: isVisible } = useInView();

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "user_name") {
      setUserName(e.target.value);
    } else if (e.target.name === "user_email") {
      setEmail(e.target.value);
    } else if (e.target.name === "message") {
      setMessage(e.target.value);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setLoader(false);
    };
    loadData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email !== "" && userName !== "" && message !== "") {
      emailjs
        .sendForm(
          "service_njqieif",
          "template_lrh64k3",
          form.current ? form.current : "",
          "FETR6CJRyFGZNn6hl"
        )
        .then(
          (result) => {
            setSuccess(true);
            setEmail("");
            setUserName("");
            setMessage("");
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
          },
          (error) => {
            setError(true);
          }
        );
    } else {
      setIsEmpty(true);
    }
  };

  return (
    <>
      {!loader && (
        <>
          <FIRSTDIV className="py-4" ref={ref}>
            <h1 className="ml-3">
              <AnimatedLetters
                letterClass={letterClass}
                strArray={["C", "o", "n", "t", "a", "c", "t", " ", "M", "e"]}
                index={15}
              />
            </h1>
            <div className="row justify-content-center align-items-center flex-column">
              <div
                className={
                  !loader
                    ? "animate__animated animate__fadeInLeft col-9"
                    : "col-9"
                }
              >
                <form
                  ref={form}
                  onSubmit={sendEmail}
                  className="row flex-column"
                >
                  <div className="col-12 p-0 mb-3">
                    <LABEL htmlFor="user_name">Name</LABEL>
                    <INPUT
                      onChange={onChangeHandler}
                      type="text"
                      name="user_name"
                      id="user_name"
                      placeholder="Enter Your Name"
                      value={userName}
                    />
                  </div>
                  <div className="col-12 p-0 mb-3">
                    <LABEL htmlFor="user_email">Email</LABEL>
                    <INPUT
                      onChange={onChangeHandler}
                      id="user_email"
                      type="email"
                      name="user_email"
                      placeholder="Enter Your E-mail"
                      value={email}
                    />
                  </div>
                  <div className="col-12 p-0 mb-3">
                    <LABEL htmlFor="message">Message</LABEL>
                    <TEXTAREA
                      name="message"
                      id="message"
                      value={message}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <BTN type="submit" className={success ? `active` : undefined}>
                    <span>Submit</span>
                    <div className="check-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                      >
                        <path
                          fill="transparent"
                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                      </svg>
                    </div>
                  </BTN>
                </form>
                {error ? (
                  <PARA className="redPara">Something Went Wrong </PARA>
                ) : isEmpty ? (
                  <PARA className="orangePara">All fields are REQUIRED!</PARA>
                ) : (
                  ""
                )}
              </div>
            </div>
          </FIRSTDIV>
          <BOTTOMDIV className="col-12 col-sm-5 col-xl-3">
            <img
              src="/images/homeImages/AvatarMaker.svg"
              alt=""
              className="solig-logo "
              style={{ height: "100%", width: "100%" }}
            />
            <div
              className={
                success ? `bubble bubble-bottom-left d-block` : "d-none"
              }
              // className="bubble bubble-bottom-left d-block"
            >
              Thank you for getting in touch with me. I look forward to
              everything we will accomplish together.
            </div>
          </BOTTOMDIV>
        </>
      )}
      {loader && (
        <DIV>
          <BoxesLoader
            boxColor={"rgb(240,144,83)"}
            shadowColor={"rgb(233, 167, 127)"}
            duration={1.5}
            desktopSize={"90px"}
            mobileSize={"64px"}
          />
        </DIV>
      )}
    </>
  );
};
