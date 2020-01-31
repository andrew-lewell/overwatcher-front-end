import React from "react";
import SignUpForm from "../components/SignUpForm";

const SignUpContainer = ({ onSuccess, user }) => {
  return (
    <div>
      <SignUpForm onSuccess={onSuccess} user={user} />
    </div>
  );
};

export default SignUpContainer;
