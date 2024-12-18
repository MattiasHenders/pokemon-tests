export default `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reminder to Play Today's PokeTest!</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: #a4c3b2;
        color: #333333;
        text-align: center;
        padding: 20px;
        font-size: 24px;
        font-weight: bold;
        border-bottom: 4px solid #333333;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .cta-button {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background: #375549;
        color: #f1f1f1;
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        border-radius: 4px;
      }
      .cta-button:visited {
        color: #f1f1f1;
      }
      .cta-button:active {
        background: #375549;
        color: #f1f1f1;
      }
      .cta-button:hover {
        background: #273b33;
      }
      .footer {
        background: #f1f1f1;
        text-align: center;
        padding: 10px;
        font-size: 14px;
        color: #666666;
      }
      .pokemon-image-container {
        text-align: center;
      }
      .pokemon-image {
        margin-top: 20px;
        width: 70%;
        height: auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Reminder to Play Today's PokeTest!</div>
      <div class="content">
        <p>Hey there, Trainer!</p>
        <p>
          It&apos;s time to test your Pokémon knowledge! Don&apos;t miss
          today&apos;s challenge and keep that streak going!
        </p>
        <a class="cta-button" href="https://poketests.com/" target="_blank">
          Play Now
        </a>
      </div>
      <div class="pokemon-image-container">
        <img class="pokemon-image" src="https://i.pinimg.com/originals/17/f9/d9/17f9d97a908d096b0ba26bba64a74514.gif" />
      </div>
      <div class="footer">
        You are receiving this email because you signed up for PokeTest. <br />
        If you wish to unsubscribe,
        <a href="https://poketests.com/unsubscribe" target="_blank"
          >click here</a
        >.
      </div>
    </div>
  </body>
</html>
`
