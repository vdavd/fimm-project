interface SelectFileProps {
  setFile: (file: File | null) => void;
}

const SelectFile = ({ setFile }: SelectFileProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <input id="file" type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default SelectFile;
