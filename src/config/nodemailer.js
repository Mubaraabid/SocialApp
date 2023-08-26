import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "65e78effd24071",
      pass: "efdd4aac008b22"
    }
  });
  export default transport;