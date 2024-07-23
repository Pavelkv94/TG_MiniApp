const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const token = "7286297089:AAFDcE8p8iUIjBwBgzMcKcT6UPAX7985zbQ";
const webAppUrl = "https://3db5-178-172-238-4.ngrok-free.app";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const first_name = msg.from.first_name;
  const username = msg.from.username;

  try {
    if (text === "/start") {
      await bot.sendMessage(chatId, "Button", {
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          inline_keyboard: [[{ text: "Inline keyboard", web_app: { url: webAppUrl } }]], //!inline_keyboard
        },
      });

      await bot.sendMessage(chatId, "Button", {
        reply_markup: {
          keyboard: [[{ text: "default keyboard", web_app: { url: webAppUrl + "/component2" } }]], //!keyboard
        },
      });
    }

    if (msg?.web_app_data?.data) {
      try {
        const data = JSON.parse(msg?.web_app_data?.data);
        console.log(data);
        await bot.sendMessage(chatId, "THANKS MAN!");
        await bot.sendMessage(chatId, "THANKS MAN! => " + data.name);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (e) {
    console.log(e);
    return bot.sendMessage(chatId, "Ой! Произошла серьезная ошибка!");
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/web-data", async (req, res) => {
  const { elements, totalPrice, queryId } = req.body;

  console.log(totalPrice);
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "SUCCESS!",
      input_message_content: { message_text: "CONGRATULATIONS!" },
    });
    return res.status(200).json({});
  } catch (error) {
    await bot.answerWebAppQuery(queryId, {
      type: "error",
      id: queryId,
      title: "ERROR!",
      input_message_content: { message_text: "ERROR text!" },
    });
    return res.status(500).json({});
  }
});
const PORT = 3002;

app.listen(PORT, () => console.log(`server running on the ${PORT} port`));
