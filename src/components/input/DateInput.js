const DateInput = ({ label, day, month, year, onChange }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
    "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"
  ];

  return (
    <div className="flex flex-col md:flex-row items-center mb-4">
      <label className="w-full md:w-1/3 mb-2 md:mb-0 text-left pr-4 font-medium">{label}</label>
      <div className="flex w-full md:w-2/3 space-x-2">
        <select name="birthDay" value={day} onChange={onChange} className="flex-1 border rounded px-2 py-2" required>
          <option value="">Gün</option>
          {days.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select name="birthMonth" value={month} onChange={onChange} className="flex-1 border rounded px-2 py-2" required>
          <option value="">Ay</option>
          {months.map((m,i) => <option key={i} value={i+1}>{m}</option>)}
        </select>
        <input type="tel" name="birthYear" placeholder="Yıl" value={year} onChange={onChange}
          className="flex-1 border rounded px-2 py-2" required />
      </div>
    </div>
  );
};

export default DateInput;
