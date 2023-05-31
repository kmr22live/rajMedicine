import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="icon-header" id="navbar-icon-header">
          <img src="https://res.cloudinary.com/druttjvrf/image/upload/v1685438308/cropedMedicineLogo_axkiyh.png" />
        </div>
        <p>
          Raj Medicine is the official Medicine ordering app for Raj Medicine
          store.
        </p>
        <ul className="socials">
          <li>
            <a>
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a>
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a>
              <i className="fa fa-google-plus" />
            </a>
          </li>
          <li>
            <a>
              <i className="fa fa-youtube" />
            </a>
          </li>
          <li>
            <a>
              <i className="fa fa-linkedin-square" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          copyright © <span>Raj Medicine </span>2023
        </p>
      </div>
    </footer>
  );
}
