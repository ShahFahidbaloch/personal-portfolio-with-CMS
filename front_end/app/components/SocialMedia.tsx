import Link from "next/link";
import React from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

interface SocialMediaProps {
  BsLinkedin?: boolean;
  FaGithub?: boolean;
  BsInstagram?: boolean;
}

const SocialMedia: React.FC<SocialMediaProps> = () => (
  <aside className="app__social" aria-label="Social media profiles">
    <Link
      href="https://www.linkedin.com/in/shah-fahid-a4543027b/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit LinkedIn profile"
    >
      <BsLinkedin aria-hidden="true" />
    </Link>
    <Link
      href="https://github.com/ShahFahidbaloch"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit GitHub profile"
    >
      <FaGithub aria-hidden="true" />
    </Link>
    <Link
      href="https://www.instagram.com/mr_fahid.dev/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Instagram profile"
    >
      <BsInstagram aria-hidden="true" />
    </Link>
  </aside>
);

export default SocialMedia;
