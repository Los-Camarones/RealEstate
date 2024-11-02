// src/utils/supabase/authListener.tsx

import supabase from "../../utils/supabase/supabaseClient"; // Import the default instance

// Listen for authentication state changes
const { data } = supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);

  if (event === "INITIAL_SESSION") {
    // handle initial session
  } else if (event === "SIGNED_IN") {
    // handle sign-in event
  } else if (event === "SIGNED_OUT") {
    console.log("signed out. auth listener");

    // Clear local and session storage
    [window.localStorage, window.sessionStorage].forEach((storage) => {
      Object.entries(storage).forEach(([key]) => {
        storage.removeItem(key);
      });
    });
  } else if (event === "PASSWORD_RECOVERY") {
    console.log("PASSWORD_RECOVERY", session);
    // Show screen to update user's password
    // showPasswordResetScreen(true)
  } else if (event === "TOKEN_REFRESHED") {
    // handle token refreshed event
  } else if (event === "USER_UPDATED") {
    // handle user updated event
  }
});

// Call unsubscribe to remove the callback when needed
data?.subscription.unsubscribe();
