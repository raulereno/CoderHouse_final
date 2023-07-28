const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASSWORD_NODEMAILER,
  },
});

const generateTicketMail = (ticket, user, linkToPay) => {
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
      <p>Hola ${user},</p>
      <p>Has realizado una compra por el valor de $${ticket.amount} en nuestra tienda en línea.</p>
      <p>A continuación, te proporcionamos el código de tu ticket de compra:</p>
      <p><strong>${ticket.code}</strong></p>
      <h3>Muchas gracias por su compra</h3>
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

const generateAccountDeletionEmail = (email) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Cuenta Eliminada</title>
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
          color: #cc0000;
        }

        p {
          font-size: 16px;
          margin-bottom: 10px;
        }

        a.button {
          display: inline-block;
          background-color: #cc0000;
          color: #ffffff;
          padding: 10px 20px;
          margin-top: 20px;
          text-decoration: none;
          border-radius: 5px;
        }

        a.button:hover {
          background-color: #b30000;
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
        <h1>Cuenta Eliminada por Inactividad</h1>
        <p>Hola,</p>
        <p>Hemos eliminado tu cuenta debido a la inactividad prolongada.</p>
        <p>Si deseas seguir utilizando nuestros servicios, por favor, regístrate nuevamente.</p>
        <a href=${`${process.env.API_URL_PROD || "http://localhost"}:${process.env.PORT || 8080}/register`} class="button">Registrarse</a>
        <footer>
          <p>Este correo electrónico es generado automáticamente. Por favor, no respondas a este mensaje.</p>
        </footer>
      </div>
    </body>
    </html>
  `;
};


const generateProductDeleteEmail = (product) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Producto Eliminado</title>
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
          color: #cc0000;
        }

        p {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .product-details {
          border: 1px solid #dddddd;
          padding: 10px;
          margin-bottom: 20px;
        }

        .product-image {
          max-width: 100%;
          height: auto;
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
        <h1>Producto Eliminado</h1>
        <p>Estimado/a Usuario/a,</p>
        <p>Lamentamos informarte que el siguiente producto ha sido eliminado de nuestra tienda:</p>
        <div class="product-details">
          <h2>${product.title}</h2>
          <p><strong>Categoría:</strong> ${product.category}</p>
          <p><strong>Descripción:</strong> ${product.description}</p>
          <p><strong>Precio:</strong> $${product.price}</p>
          <img class="product-image" src="${product.image}" alt="${product.title}" />
        </div>
        <footer>
          <p>Si tienes alguna consulta o necesitas más información, por favor responde a este correo electrónico.</p>
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

const sendTicketMail = async (ticket, user) => {
  let result = await transport.sendMail({
    from: "Ecommerce <raulereno@gmail.com> ",
    to: user,
    subject: "Ticket de Compra Ecommerce",
    html: generateTicketMail(ticket, user),
    attachments: [],
  });

  return result;
};

const sendInfoDeleteAcount = async (email) => {
  let result = await transport.sendMail({
    from: "Ecommerce <raulereno@gmail.com> ",
    to: email,
    subject: "Cuenta eliminada por inactividad",
    html: generateAccountDeletionEmail(email),
    attachments: [],
  });

  return result;
};

const sendInfoDeleteProduct = async (product) => {

  let result = await transport.sendMail({
    from: "Ecommerce <raulereno@gmail.com> ",
    to: product.owner,
    subject: `Producto ${product.title} ha sido eliminado`,
    html: generateProductDeleteEmail(product),
    attachments: [],
  });

  return result;
};

module.exports = { sendTicketMail, sendResetPassEmail, sendInfoDeleteAcount, sendInfoDeleteProduct };
