export const isiData = (results) => {
    const dataPengeluaran = [
      {id: "tanggal_keluar", path: "data.0.tanggal_keluar"},
      {id: "jumlah_keluar", path: "data.0.jumlah_keluar"},
      {id: "sumber", path: "data.0.sumber"},
      {id: "deskripsi", path: "data.0.deskripsi"},
    ];
  
  
    dataPengeluaran.forEach(({ id, path, index, property }) => {
      const inputElement = document.getElementById(id);
      const value = getNestedValue(results, path, index, property);
      inputElement.value = value;
    });
  }
  
  const getNestedValue = (obj, path, index, property) => {
    const value = path
      .split(".")
      .reduce((value, key) => (value && value[key] !== undefined ? value[key] : ""), obj);
  
  
    if (
      Array.isArray(value) &&
      value.length > index &&
      value[index].hasOwnProperty(property)
    ) {
      return value[index][property];
    }
  
    return value;
  };