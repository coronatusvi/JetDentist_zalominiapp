// import { CloseOutlined } from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { classNames } from "../../../utils/common";

const { Paragraph } = Typography;

interface BaseModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  width?: any;
  children: ReactNode;
  bodyStyle?: any;
  styleTitle?: string;
  disableSubmitBtn?: boolean;
  nameCancel?: string;
  nameConfirm?: string;
  styleButtonCancel?: string;
  styleButtonConfirm?: string;
  typeButtonConfirm?: "primary" | "default" | "danger";
  isHideAction?: boolean;
  afterOpenChange?: any;
}

export const BaseModal = (props: BaseModalProps) => {
  const {
    isOpen,
    onSubmit,
    onClose,
    width,
    isHideAction,
    title,
    children,
    bodyStyle,
    disableSubmitBtn,
    nameCancel,
    nameConfirm,
    styleTitle,
    styleButtonCancel,
    styleButtonConfirm,
    afterOpenChange,
  } = props;
  const [isShown, setIsShown] = useState<boolean>(isOpen);

  const closeModal = () => {
    setIsShown(false);
    onClose && onClose();
  };

  const submitModal = () => {
    onSubmit && onSubmit();
    setIsShown(false);
  };

  useEffect(() => {
    setIsShown(isOpen);
  }, [isOpen]);

  return (
    <Modal
      centered
      width={width}
      open={isShown}
      afterOpenChange={afterOpenChange}
      onCancel={() => {
        closeModal();
      }}
      closable={false}
      footer={null}
    >
      {title && (
        <div className="flex items-center justify-between px-6 py-4 bg-white rounded-lg">
          <Paragraph
            className={classNames(
              "font-bold text-left text-darkNight900",
              styleTitle
            )}
          >
            {title}
          </Paragraph>
          {/* <CloseOutlined
          onClick={closeModal}
          className="text-2xl text-gray-500 cursor-pointer"
        /> */}
        </div>
      )}
      <div
        className={classNames(
          "max-h-[80vh] px-6 py-4 overflow-auto",
          bodyStyle
        )}
      >
        {children}
      </div>
      {!isHideAction && (
        <div className="flex justify-end flex-1 gap-4 px-4 py-2 border-t border-darkNight100 sm:px-6">
          <Button
            onClick={closeModal}
            type="default"
            className={styleButtonCancel}
          >
            {nameCancel || "Hủy"}
          </Button>
          <Button
            onClick={submitModal}
            className={styleButtonConfirm}
            type="primary"
            disabled={disableSubmitBtn}
          >
            {nameConfirm || "Xác nhận"}
          </Button>
        </div>
      )}
    </Modal>
  );
};
