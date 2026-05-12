import { useState } from "react";
import "../Styles/ContactForm.scss";
import '../Styles/ContactForm.scss'

function ContactForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      lastName,
      email,
      message,
    });
  };

  return (
    <>
    <div className="sending-message">Send us a Message</div>
        <form onSubmit={handleSubmit} className="contact-form sending-message">
      <input
        type="text"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <textarea
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
    </>

  );
}

export default ContactForm;