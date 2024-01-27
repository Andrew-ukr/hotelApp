import React, { useState } from "react";
import { Button, Input, Modal, Textarea } from "../UI";
import {
  handleInputChangeType,
  handleTextareaChangeType,
} from "../../Types/common";
import { GUEST_MODAL, TOAST_SOMETHING_WENT_WRONG } from "../../Utils/constants";
import { useModalVisibility } from "../../hooks/useModalVisibility";
import { useCreateGuestMutation } from "../../Redux/Slices/guests/guestsApi";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify";

type InputListsTypes = {
  label: string;
  onChange: handleInputChangeType;
  value: string;
  placeholder: string;
  type: "text" | "password" | "email" | "tel";
};

const GuestModal = () => {
  const { handleCloseModal, isOpen } = useModalVisibility(GUEST_MODAL);

  const [createGuest, { isLoading, isError }] = useCreateGuestMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");

  const handleNameChange: handleInputChangeType = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange: handleInputChangeType = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneChange: handleInputChangeType = (e) => {
    setPhone(e.target.value);
  };

  const handleCityChange: handleInputChangeType = (e) => {
    setCity(e.target.value);
  };

  const handleAddressChange: handleInputChangeType = (e) => {
    setAddress(e.target.value);
  };

  const handlePassportChange: handleInputChangeType = (e) => {
    setPassportNumber(e.target.value);
  };

  const handleEmailChange: handleInputChangeType = (e) => {
    setEmail(e.target.value);
  };

  const handleNoticeChange: handleTextareaChangeType = (e) => {
    setNotice(e.target.value);
  };

  const resetState = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setCity("");
    setAddress("");
    setPassportNumber("");
    setEmail("");
    setNotice("");
  };

  const createNewGuest = async () => {
    const body = {
      firstName,
      lastName,
      phone,
      city,
      address,
      passportNumber,
      email,
      notice,
    };

    try {
      const response = await createGuest(body).unwrap();
      if (response.success) {
        resetState();
        handleCloseModal();
        toast.success("New guest has been created");
      }
    } catch (error: any) {
      toast.error(TOAST_SOMETHING_WENT_WRONG);
      throw new Error(error);
    }
  };

  const leftInputsList: InputListsTypes[] = [
    {
      label: "Name",
      onChange: handleNameChange,
      value: firstName,
      placeholder: "Enter guest name",
      type: "text",
    },
    {
      label: "Surname",
      onChange: handleLastNameChange,
      value: lastName,
      placeholder: "Enter surname",
      type: "text",
    },
    {
      label: "Phone",
      onChange: handlePhoneChange,
      value: phone,
      placeholder: "Enter phone number",
      type: "tel",
    },
    {
      label: "City",
      onChange: handleCityChange,
      value: city,
      placeholder: "Enter the city",
      type: "text",
    },
    {
      label: "Address",
      onChange: handleAddressChange,
      value: address,
      placeholder: "Enter the address",
      type: "text",
    },
  ];

  const rightInputsList: InputListsTypes[] = [
    {
      label: "Passport number",
      onChange: handlePassportChange,
      value: passportNumber,
      placeholder: "Enter passport number",
      type: "text",
    },
    {
      label: "Email",
      onChange: handleEmailChange,
      value: email,
      placeholder: "Enter guest email",
      type: "email",
    },
  ];

  const actions = (
    <div className="flex gap-4">
      <Button
        onClick={handleCloseModal}
        bgColor="white"
        textColor="text-app-grey-500"
        className="border-2"
      >
        Cancel
      </Button>
      <Button onClick={createNewGuest}>Save</Button>
    </div>
  );
  
  return (
    <Modal
      size="max-w-3xl"
      title="New Guest"
      isOpen={!!isOpen}
      closeModal={handleCloseModal}
      actions={actions}
    >
      {isLoading && (
        <div className="flex justify-center items-center grow w-full">
          <SyncLoader color="#1570ef" />
        </div>
      )}
      {!isLoading && (
        <div className="flex justify-between">
          <div className="">
            {leftInputsList.map(
              ({ label, onChange, value, placeholder, type }, index) => {
                return (
                  <Input
                    key={index}
                    label={label}
                    className="mb-3"
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    type={type}
                  />
                );
              }
            )}
          </div>
          <div className="">
            {rightInputsList.map(
              ({ label, onChange, value, placeholder, type }, index) => {
                return (
                  <Input
                    key={index}
                    label={label}
                    className="mb-3"
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    type={type}
                  />
                );
              }
            )}
            <Textarea
              label="Notice"
              className="!h-48"
              onChange={handleNoticeChange}
              value={notice}
              placeholder="Enter notice"
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default GuestModal;
