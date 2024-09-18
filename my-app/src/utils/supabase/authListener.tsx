import { createClient } from "../../utils/supabase/supabaseClient";
const supabase = createClient();

const { data } = supabase.auth.onAuthStateChange((event, session) => {

  console.log(event, session);

  if (event === "INITIAL_SESSION") {
    // handle initial session
  } else if (event === "SIGNED_IN") {
    // handle sign in event
  } else if (event === "SIGNED_OUT") {
    console.log("signed out. auth listener");

    // clear local and session storage
    [window.localStorage, window.sessionStorage].forEach((storage) => {
      Object.entries(storage).forEach(([key]) => {
        storage.removeItem(key);
      });
    });
  } else if (event === "PASSWORD_RECOVERY") {
    console.log("PASSWORD_RECOVERY", session);
    // show screen to update user's password
    //showPasswordResetScreen(true)
  } else if (event === "TOKEN_REFRESHED") {
    // handle token refreshed event
  } else if (event === "USER_UPDATED") {
    // handle user updated event
  }
});

// call unsubscribe to remove the callback
data.subscription.unsubscribe();
