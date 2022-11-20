import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="Footer container-fluid">
      <div className="row lists">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="row">
                <div className="col-md-4">
                  <h2>company</h2>
                  <ul>
                    <li>
                      <a href="/">about</a>
                    </li>
                    <li>
                      <a href="/">store location</a>
                    </li>
                    <li>
                      <a href="/">collection</a>
                    </li>
                    <li>
                      <a href="/">brands</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h2>support</h2>
                  <ul>
                    <li>
                      <a href="/">contact</a>
                    </li>
                    <li>
                      <a href="/">terms</a>
                    </li>
                    <li>
                      <a href="/">provacy policy</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h2>company</h2>
                  <ul>
                    <li>
                      <a href="/">about</a>
                    </li>
                    <li>
                      <a href="/">store location</a>
                    </li>
                    <li>
                      <a href="/">collection</a>
                    </li>
                    <li>
                      <a href="/">brands</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row copyright">
        <div className="col-md-12">
          <p>
            Copyrights &copy; 2019 <span>furwood</span>. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
