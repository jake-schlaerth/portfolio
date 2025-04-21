import { useState } from "react";
import { Layout } from "../../components";
import { VFXRenderer } from "./VFXRenderer";
import { InfoModal } from "./InfoModal";

export const VFXRendererPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <VFXRenderer />
      <InfoModal isOpen={isModalOpen} onClose={closeModal} />
    </Layout>
  );
};
