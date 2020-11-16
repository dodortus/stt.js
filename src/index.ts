import mitt from 'mitt';
import { isSupportedBrowser } from './env';

const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();
const emitter = mitt();

// ref https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
class STT {
  private recognition: typeof speechRecognition;
  private isRecognizing: boolean = false;
  private finalTranscript: string = '';

  constructor({ lang = navigator.language, continuous = false, interimResults = false }) {
    this.recognition = recognition;
    this.recognition.lang = lang;
    this.recognition.continuous = continuous;
    this.recognition.interimResults = interimResults;

    this.recognition.onstart = this.onStart;
    this.recognition.onend = this.onEnd;
    this.recognition.onresult = this.onResult;
    this.recognition.onerror = this.onError;
  }

  on(eventName: string, listener: () => void) {
    emitter.on(eventName, listener);
  }

  off(eventName: string, listener: () => void) {
    emitter.off(eventName, listener);
  }

  start = () => {
    if (!isSupportedBrowser) {
      emitter.emit('error', 'not-supported-browser');
      return;
    }

    if (this.isRecognizing) {
      this.stop();
      return;
    }

    this.finalTranscript = '';
    this.recognition.start();
  };

  stop = () => {
    this.recognition.stop();
  };

  onStart = () => {
    this.isRecognizing = true;
    emitter.emit('start');
  };

  onEnd = () => {
    this.isRecognizing = false;
    emitter.emit('end');
  };

  onResult = (event) => {
    let interimTranscript: string = '';
    if (typeof event.results === 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return false;
    }

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        this.finalTranscript += transcript;
        console.log('isFinal :>> ', transcript, event.results);
      } else {
        interimTranscript += transcript;
      }
    }

    // emit result
    emitter.emit('result', {
      finalTranscript: this.finalTranscript,
      interimTranscript: interimTranscript,
      results: event.results,
    });
  };

  onError = (event) => {
    this.isRecognizing = false;
    emitter.emit('error', event.error);
  };

  getIsRecognizing = () => {
    return this.isRecognizing;
  };
}

export default STT;
