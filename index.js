require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");
const path = require("path");

const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
});

var _input = process.argv[2];
var _path = process.argv[3];
if ( _path === undefined)
{
        _path="./"
}

if (_input === undefined) {
        _input = fs.readFileSync(path.resolve(_path+"input.txt"), "utf8");
}



const _output = path.resolve(_path+"output.mp3");


const voice = ["alloy", "echo", "fable", "onyx", "nova",  "shimmer"];

async function TTS() {
        try {
                const mp3 = await openai.audio.speech.create({
                        model: "tts-1-hd",
                        voice: voice[4], //voice[Math.floor(Math.random() * voice.length)],
                        input: _input,
                });

                if (fs.existsSync(_output)) {
                        fs.unlinkSync(_output);
                }

                const buffer = Buffer.from(await mp3.arrayBuffer());
                await fs.promises.writeFile(_output, buffer);
                await fs.promises.writeFile(_path+'base64.txt', buffer.toString('base64'));
                const base64 = fs.readFileSync(path.resolve(_path+"base64.txt"), "utf8");
                console.log(base64);
        } catch (error) {
                console.log("Speech synthesis failed.");
                console.error(error);
        }
}
TTS();