import { useState, useEffect } from "react";

const useFormData = () => {
  const [formData, setFormData] = useState({
    kimlikNo: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    ad: "",
    soyad: "",
    isyeriUnvani: "",
    yetkiliKisi: "",
    cepTelefonu: "",
    mahalle: "",
    sokak: "",
    kadinCalisan: "",
    erkekCalisan: "",
    kvkkOnay: false,
  });

  // Test için otomatik dolu form
  useEffect(() => {
    setFormData({
      kimlikNo: "12345678901",
      birthDay: "01",
      birthMonth: "01",
      birthYear: "1990",
      ad: "Ali",
      soyad: "Veli",
      isyeriUnvani: "Test Ltd.",
      yetkiliKisi: "Ahmet Kaya",
      cepTelefonu: "05551234567",
      mahalle: "19MAYIS",
      sokak: "Atatürk Cd.",
      kadinCalisan: "10",
      erkekCalisan: "15",
      kvkkOnay: true,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      kimlikNo: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      ad: "",
      soyad: "",
      isyeriUnvani: "",
      yetkiliKisi: "",
      cepTelefonu: "",
      mahalle: "",
      sokak: "",
      kadinCalisan: "",
      erkekCalisan: "",
      kvkkOnay: false,
    });
  };

  return { formData, handleChange, resetForm };
};

export default useFormData;
