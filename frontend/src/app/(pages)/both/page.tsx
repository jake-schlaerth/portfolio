import { Dialog } from "@components/both/Dialog";
import { GenerateTone } from "@components/both/GenerateTone";

const Both = () => (
  <>
    <Dialog />
    <GenerateTone midiNote={60} />
    <GenerateTone midiNote={64} />
    <GenerateTone midiNote={67} />
    <GenerateTone midiNote={71} />
  </>
);

export default Both;
