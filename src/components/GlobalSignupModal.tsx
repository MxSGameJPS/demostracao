"use client";

import { useModal } from "@/context/ModalContext";
import SignupModal from "./SignupModal";

export default function GlobalSignupModal() {
  const { isSignupOpen, closeSignup } = useModal();
  return <SignupModal isOpen={isSignupOpen} onClose={closeSignup} />;
}
