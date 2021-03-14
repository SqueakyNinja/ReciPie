import React from "react";
import { useStore } from "../../store";

function Profile() {
  const { currentUser } = useStore();
  return (
    <div>
      {currentUser.username}, {currentUser.id}
    </div>
  );
}

export default Profile;
