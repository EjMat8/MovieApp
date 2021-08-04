import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaRegCopyright,
} from "react-icons/fa";
export default function Footer() {
  return (
    <div className="footer">
      <span>Stay Connected</span>
      <div className="footer__icons">
        <FaFacebookF />
        <FaTwitter />
        <FaYoutube />
        <FaInstagram />
      </div>
      <span>
        <FaRegCopyright />
        2021 HBO Asia. All Rights Reserved.
      </span>
      <span>Help</span>
      <span>Privacy (Updated)</span>
      <span>Terms</span>
      <span>Legal Notices</span>
    </div>
  );
}
