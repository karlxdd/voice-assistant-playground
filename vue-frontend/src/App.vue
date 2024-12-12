<template>
  <div>
    <h1>Voice Assistant</h1>
    <button @click="toggleListening">
      {{ isListening ? "Stop Listening" : "Start Listening" }}
    </button>
    <p v-if="transcript">You said: {{ transcript }}</p>
    <p v-if="response">AI Response: {{ response }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const isListening = ref(false); // Tracks whether the microphone is listening
const transcript = ref(""); // Holds the current transcript from the speech
const response = ref(""); // Holds AI response from OpenAI

// Initialize SpeechRecognition
const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true; // Keep listening after one input
  recognition.interimResults = false; // We want only final results
}

const startListening = () => {
  if (recognition) {
    recognition.start();
    console.log("Listening started...");
    isListening.value = true;

    recognition.onstart = () => {
      console.log("Speech recognition started.");
    };

    recognition.onspeechstart = () => {
      console.log("Speech detected.");
    };

    recognition.onresult = (event) => {
      console.log("Recognized speech:", event.results);
      const spokenText = event.results[0][0].transcript;
      transcript.value = spokenText; // Update the transcript with spoken text
      console.log("You said:", spokenText);
      sendCommandToAI(spokenText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
      if (isListening.value) {
        recognition.start(); // Restart recognition if still listening
        console.log("Restarting recognition...");
      }
    };
  } else {
    console.error("SpeechRecognition API is not supported in this browser.");
  }
};

const stopListening = () => {
  if (recognition && isListening.value) {
    recognition.stop();
    isListening.value = false;
    console.log("Listening stopped.");
  }
};

const toggleListening = () => {
  if (isListening.value) {
    stopListening();
  } else {
    startListening();
  }
};

const sendCommandToAI = async (spokenText) => {
  try {
    // Send the spoken text to OpenAI API via GraphQL using axios
    const responseFromAI = await axios.post("http://localhost:3000/graphql", {
      query: `
        query {
          handleVoiceCommand(command: "${spokenText}")
        }
      `,
    });

    const aiResponse =
      responseFromAI?.data?.data?.handleVoiceCommand || "No response from AI";
    response.value = aiResponse;
  } catch (error) {
    console.error("Error communicating with AI:", error);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #367e6d;
}
</style>
