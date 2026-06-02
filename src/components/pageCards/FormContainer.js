import React from "react";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import DateInput from "../input/DateInput";
import CheckboxInput from "../input/CheckboxInput";
import useFormData from "../../hooks/form/useFormData";
import useSubmitForm from "../../hooks/form/useSubmitForm";

const FormContainer = () => {
  const { formData, handleChange, resetForm } = useFormData();
  const { submitted, handleSubmit } = useSubmitForm();

  return (
    <div className="relative w-full">
      {submitted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg mb-4 shadow-lg z-10">
          Başvurunuz başarıyla gönderildi!
        </div>
      )}

      <form
        className="md:w-2/2 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
        onSubmit={(e) => handleSubmit(e, formData, resetForm)}
      >
        {/* inputlar */}
        <TextInput label="*Kimlik No" name="kimlikNo" value={formData.kimlikNo} onChange={handleChange} type="tel" required />
        <DateInput label="Doğum Tarihi" day={formData.birthDay} month={formData.birthMonth} year={formData.birthYear} onChange={handleChange} />
        <TextInput label="*Ad" name="ad" value={formData.ad} onChange={handleChange} required />
        <TextInput label="*Soyad" name="soyad" value={formData.soyad} onChange={handleChange} required />
        <TextInput label="*İşyeri Ünvanı" name="isyeriUnvani" value={formData.isyeriUnvani} onChange={handleChange} required />
        <TextInput label="*Yetkili Kişi" name="yetkiliKisi" value={formData.yetkiliKisi} onChange={handleChange} required />
        <TextInput label="*Cep Telefonu" name="cepTelefonu" value={formData.cepTelefonu} onChange={handleChange} required type="tel" />
        <SelectInput
          label="Mahalle"
          name="mahalle"
          value={formData.mahalle}
          onChange={handleChange}
          options={[
            { value: "19MAYIS", label: "19 MAYIS" },
            { value: "AHMEDIYE", label: "AHMEDİYE" },
            { value: "ALKENT2000", label: "ALKENT 2000" },
          ]}
          required
        />
        <TextInput label="Sokak-Cadde" name="sokak" value={formData.sokak} onChange={handleChange} required />
        <TextInput label="Kadın Çalışan Sayısı" name="kadinCalisan" value={formData.kadinCalisan} onChange={handleChange} required type="tel" />
        <TextInput label="Erkek Çalışan Sayısı" name="erkekCalisan" value={formData.erkekCalisan} onChange={handleChange} required type="tel" />

        <div className="md:col-span-2">
          <CheckboxInput
            label={
              <span>
                KVKK Metnini{" "}
                <a href="https://www.bcekmece.bel.tr/kvkk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  okudum kabul ediyorum
                </a>
              </span>
            }
            name="kvkkOnay"
            checked={formData.kvkkOnay}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!formData.kvkkOnay}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          Başvuru Oluştur
        </button>
      </form>
    </div>
  );
};

export default FormContainer;