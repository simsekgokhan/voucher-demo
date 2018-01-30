import Sound from 'react-native-sound';

Sound.setCategory('Playback');


const voucherEvent = new Sound('beep-beep.mp3', Sound.MAIN_BUNDLE, (err) => {
  console.log('Failed to load the sound', err);
});

export function playSound() {
  voucherEvent.setVolume(1).play((success) => {
    if(!success) {
      voucherEvent.reset;
    }
  });
}
