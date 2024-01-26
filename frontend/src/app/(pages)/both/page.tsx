import { StartModal, GenerateTone } from "./components";

const Both = () => (
  <>
    <StartModal />
    <GenerateTone midiNote={60} />
    <GenerateTone midiNote={64} />
    <GenerateTone midiNote={67} />
    <GenerateTone midiNote={71} />
  </>
);

export default Both;
