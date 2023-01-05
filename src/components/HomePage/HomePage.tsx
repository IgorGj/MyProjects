import styled from "styled-components";
import styles from "./button.module.css";
const H4 = styled.h4`
  margin: 20px 0 0;
  padding: 0px 20px;
  font-style: italic;
  font-weight: 900;
`;

const H2 = styled.h2`
  margin: 20px 0 0;
  padding: 0px 20px;
  font-family: "Rubik 80s Fade", cursive;
  font-weight: 00;
`;
const IMG = styled.img`
  margin: 0 0 20px;
  width: 300px;
  height: 350px;
  border-radius: 50%;
`;
const DIV = styled.div`
  padding: 50px;
  height: 100vh;
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
  }
`;
const BIGDIV = styled.div`
  height: 100vh;
  background: url("/images/banner/second.avif") no-repeat center center;
  background-size: cover;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CENTERED = styled.div`
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
`;

const SPAN = styled.p`
  padding: 5px 20px;
  border: 3px solid;
  border-radius: 15px;
  background: linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%);
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
  display: inline-block;
  margin: 0;
`;
const BTN = styled.button`
  margin-left: 5px;
`;
export const HomePage = () => {
  const downloadMethod = () => {
    fetch("Igor_Gjorgjievski-CV12-22.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Igor-Gjorgjievski-FrontEnd-Developer-CV.pdf";
        alink.click();
      });
    });
  };

  const clickMe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    target.classList.remove(`${styles.animate}`);
    target.classList.add(`${styles.animate}`);
    setTimeout(() => {
      target.classList.remove(`${styles.animate}`);
    }, 600);
  };

  return (
    <>
      <BIGDIV>
        <DIV id="home">
          <div className="col-6 text-left">
            <SPAN className="pulsing">Weclome to my porftolio</SPAN>
            <H4>I'm</H4>
            <H2>Igor Gjorgjievski</H2>
            <H4>Frontend Developer "ReactJS"</H4>
          </div>
          <CENTERED className="col-6">
            <IMG src="/images/astronaut.png" alt="" className="avatar" />
            <Container>
              <button
                onClick={(e) => {
                  clickMe(e);
                  downloadMethod();
                }}
                className={`${styles.bubblyButton}`}
              >
                Download CV
              </button>
              <BTN className={`${styles.bubblyButton}`} onClick={clickMe}>
                Contact Me
              </BTN>
            </Container>
          </CENTERED>
        </DIV>
      </BIGDIV>
    </>
  );
};
