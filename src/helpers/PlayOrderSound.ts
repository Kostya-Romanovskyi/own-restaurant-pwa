
import audioNewOrders from '../assets/audio/newOrder.mp3'

const playOrderSound = () => {
    var audio = new Audio(audioNewOrders);

    audio.play();
}

export default playOrderSound