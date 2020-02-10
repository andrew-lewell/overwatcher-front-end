import React from "react";
import SignUpForm from "../components/SignUpForm";

const SignUpContainer = ({
  onSuccess,
  user,
  activeSeason,
  setActiveSeasonId
}) => {
  return (
    <div>
      <SignUpForm
        onSuccess={onSuccess}
        user={user}
        activeSeason={activeSeason}
        setActiveSeasonId={setActiveSeasonId}
      />
    </div>
  );
};

export default SignUpContainer;
