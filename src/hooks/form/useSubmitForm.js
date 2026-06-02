import { useState } from "react";

const useSubmitForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e, formData, resetForm) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    // fake API: 1 saniye bekle ve gönderildi alert gelsin
    setTimeout(() => {
      setSubmitted(true);
      resetForm();
      setTimeout(() => setSubmitted(false), 3000); // 3 saniye sonra kaybolan alert
    }, 1000);
  };

  return { submitted, handleSubmit };
};

export default useSubmitForm;
