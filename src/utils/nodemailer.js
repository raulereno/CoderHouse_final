const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASSWORD_NODEMAILER,
  },
});

const generateBodyMail = (ticket, user, linkToPay) => {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Confirmación de Compra</title>
    <style>
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        color: #333333;
      }

      h1 {
        font-size: 24px;
        color: #0066cc;
      }

      p {
        font-size: 16px;
        margin-bottom: 10px;
      }

      a {
        text-decoration: none;
        color: #000000;
      }

      .button {
        display: inline-block;
        background-color:#b6b6b673;
        color: #000000;
        padding: 10px 20px;
        margin-top: 20px;
        text-decoration: none;
        border-radius: 5px;
        
      }

      .button:hover {
        background-color:  #b6b6b6;
      }

      footer {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>¡Gracias por tu compra!</h1>
      <p>Hola ${user.username},</p>
      <p>Has realizado una compra por el valor de $${ticket.amount} en nuestra tienda en línea.</p>
      <p>A continuación, te proporcionamos el código de tu ticket de compra:</p>
      <p><strong>${ticket.code}</strong></p>
      <p>Por favor, utiliza este código para completar el proceso de pago a través de los métodos de pago disponibles:</p>
      <ul>
        <li>Tarjeta de Crédito</li>
        <li>Tarjeta de Débito</li>
        <li>Transferencia bancaria</li>
      </ul>
      <a href="${linkToPay}" class="button">Ir a método de pago</a>
      <footer>
        <p>Este correo electrónico es generado automáticamente. Por favor, no respondas a este mensaje.</p>
      </footer>
    </div>
  </body>
</html>`;
};

const generateResetPasswordEmail = (resetLink) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Restaurar Contraseña</title>
      <style>
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          color: #333333;
        }

        h1 {
          font-size: 24px;
          color: #0066cc;
        }

        p {
          font-size: 16px;
          margin-bottom: 10px;
        }

        a.button {
          display: inline-block;
          background-color: #0066cc;
          color: #ffffff;
          padding: 10px 20px;
          margin-top: 20px;
          text-decoration: none;
          border-radius: 5px;
        }

        a.button:hover {
          background-color: #0052b3;
        }

        footer {
          font-size: 12px;
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Restaurar Contraseña</h1>
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Por favor, haz clic en el siguiente botón para restablecer tu contraseña,este link tiene validez de una hora despues tendras que generar otro:</p>
        <a href="${resetLink}" class="button">Restablecer Contraseña</a>
        <footer>
          <p>Este correo electrónico es generado automáticamente. Por favor, no respondas a este mensaje.</p>
        </footer>
      </div>
    </body>
    </html>
  `;
};

const sendResetPassEmail = async (resetLink, user) => {
  let result = await transport.sendMail({
    from: "Ecommerce <raulereno@gmail.com> ",
    to: user.email,
    subject: "Restaurar Contraseña",
    html: generateResetPasswordEmail(resetLink),
    attachments: [],
  });

  return result;
};

const sendTicketMail = async (ticket, user, linkToPay) => {
  let result = await transport.sendMail({
    from: "Ecommerce <raulereno@gmail.com> ",
    to: user.username,
    subject: "Ticket de Compra Ecommerce",
    html: generateBodyMail(ticket, user, linkToPay),
    attachments: [],
  });

  return result;
};

module.exports = { sendTicketMail, sendResetPassEmail };
