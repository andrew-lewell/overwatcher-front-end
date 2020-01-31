import React from "react";
import SignInForm from "../components/SignInForm";

const SignInContainer = ({ onSuccess, user }) => {
  return (
    <div>
      <SignInForm onSuccess={onSuccess} user={user} />
    </div>
  );
};

export default SignInContainer;
