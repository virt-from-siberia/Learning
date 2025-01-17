import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import { NOTIFICATION_STATUS } from "../../store/notification-context";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotifications({
      title: "RegistrationSinging up ",
      message: "Registering for newsletter",
      status: NOTIFICATION_STATUS.PENDING,
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then(() => {
        notificationCtx.showNotifications({
          title: "Success!",
          message: "Successfully registered for newsletter",
          status: NOTIFICATION_STATUS.SUCCESS,
        });
      })
      .catch((error) => {
        notificationCtx.showNotifications({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: NOTIFICATION_STATUS.ERROR,
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
