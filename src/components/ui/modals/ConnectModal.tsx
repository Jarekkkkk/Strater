import React, { useEffect } from "react";
import Connect from "./Connect";
import { type UseDisclosureProps } from "@/hooks/useDisclosure";
import ModalContainer from "./ModalContainer";

type Props = UseDisclosureProps;

const ConnectModal = (props: Props) => {
  const { isOpen } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalContainer {...props} top="top-[10%]">
      <Connect {...props} />
    </ModalContainer>
  );
};

export default ConnectModal;
