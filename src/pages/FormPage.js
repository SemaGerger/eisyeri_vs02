import React from "react";
import logo from "../assets/logos/esitIsyeriLogo.png";
import FormContainer from "../components/pageCards/FormContainer";


const FormPage = () => {
  return (
   
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl p-8 flex flex-col md:flex-row gap-8">
        
        {/* Logo ve açıklama */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 p-4 bg-blue-50 rounded-lg justify-center">
          <img src={logo} alt="logo" className="w-32 mb-6" />
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left">Başvuru Formu</h2>
          <p className="text-gray-600 text-center md:text-left">
            Lütfen tüm alanları eksiksiz doldurun. KVKK metnini onaylamadan form gönderilemez.
          </p>
        </div>

        {/* Form */}
        <FormContainer />
      </div>
    </div>
 
  );
};

export default FormPage;