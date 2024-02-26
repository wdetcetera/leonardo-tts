import Switch from "@mui/material/Switch";

import {
  Box,
  //Button,
  CssBaseline,
  Divider,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  //ActionRequest,
  //AudioActionResponse,
  ChatController,
  //FileActionResponse,
  MuiChat,
} from "./libs/leonardo/esm/index";
import React from "react";
import { useState,useCallback } from "react";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#d5654d",
    },
  },
});

export function App(): React.ReactElement {
  const label = { inputProps: { "aria-label": "Audio" } };
  const [audio, setAudio] = useState(false);
  const [chat, setChat] = useState({ welcome: false });

  const handleAudioStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setAudio(e.target.checked);
  },[]);
  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    })
  );

  React.useMemo(() => {
    echo(chatCtl,audio,chat);
  }, [chatCtl,audio,chat]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ height: "100%", backgroundColor: "gray" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            bgcolor: "background.default",
          }}>
          <Typography sx={{ diplay:'none', p: 1 }}>
             Welcome to <Link href='https://wpopera.co/leonardo/'>LEONARDO</Link>{" "} 
            <span style={{ marginLeft: 20 }}>
              {label.inputProps["aria-label"]}
            </span>
            <Switch {...label} onChange={handleAudioStatus} />
          </Typography>

          <Divider />
          <Box sx={{ flex: "1 1 0%", minHeight: 0 }}>
            <MuiChat chatController={chatCtl} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

async function fetchJARVIS(text: string): Promise<string> {
  let response = await fetch(
    "https://integrationhub.wpopera.cloud/webhook/38b2f0fa-9a5a-49b4-be15-71d58b60bcba?topic=" +
      text
  );
  return await response.text();
}

async function fetchAudio(text: string) {
  let response = await fetch(
    "https://integrationhub.wpopera.cloud/webhook/text-to-speech?text=" + text
  );
  return await response.text();
}

async function echo(chatCtl: ChatController,audio:boolean,chat: any): Promise<void> {
  const greetigns = [
    " Good morning! 🌞",
    " Good afternoon!",
    " Good evening!",
    " Good night!",
  ];
  const saluts = [
    "Hi there! 😊 ",
    "Hey there! 😊 ",
    "Yo, what's up? 🙂",
    "Hey, I do not thinkg I know you, What's going on?",
    "Oi, mate, what's new? 😄",
    "Wow, are you new here? How's it going? 😊",
    "Hey! I can be shy when I meet new people 🤭",
    "Ah I like meeting new people, how are you doing? 😄",
    "Howdy! 😄",
    "Hiya! 😄",
  ];

  let currentTime = new Date();
  let hours = currentTime.getHours();
  let salut = "";
  if (hours < 12) {
    salut = saluts[Math.floor(Math.random() * saluts.length)] + greetigns[0];
  } else if (hours >= 12 && hours < 17) {
    salut = saluts[Math.floor(Math.random() * saluts.length)]+ greetigns[1];
  } else if (hours >= 17 && hours < 20) {
    salut = saluts[Math.floor(Math.random() * saluts.length)]+ greetigns[2];
  } else {
    salut = saluts[Math.floor(Math.random() * saluts.length)] + greetigns[3];
  }
  if (!chat.welcome) {
    chat.welcome = true;
    await chatCtl.addMessage({
      type: "text",
      content: salut + "",
      self: false,
      avatar: "face.png",
    });
  }

  const text = await chatCtl.setActionRequest({
    type: "text",
    placeholder: "Please ask me something",
    sendButtonText: "Chat",
    onClick: () => {
      alert("clicked");
    },
  });
  await fetchJARVIS(text.value).then(
    async (response) => {
      console.log({response});
      await chatCtl.addMessage({
        type: "text",
        content: `${response.trim()}`,
        self: false,
        avatar: "face.png",
      });
      if (audio) {
        await fetchAudio(response).then(async (audio) => {
          await chatCtl.addMessage({
            type: "jsx",
            content: <span dangerouslySetInnerHTML={{ __html: audio }} />,
            self: false,
            avatar: "face.png",
          });
        });
      }
    }
  );

  echo(chatCtl,audio,chat);
}

