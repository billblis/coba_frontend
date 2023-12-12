export const isiData = (results) => {
    const dataPemasukan = [
      { id: "tanggal_masuk", path: "data.0.tanggal_masuk" },
      { id: "jumlah_masuk", path: "data.0.jumlah_masuk", type: "integer" },
      { id: "sumber", path: "data.0.sumber" },
      { id: "deskripsi", path: "data.0.deskripsi" },
    ];
  
    dataPemasukan.forEach(({ id, path, type, index, property }) => {
      const inputElement = document.getElementById(id);
      const value = getNestedValue(results, path, index, property);
  
      // Check the data type and convert if necessary
      const processedValue = processValue(value, type);
  
      inputElement.value = processedValue;
    });
  };
  
  const processValue = (value, type) => {
    if (type === "integer") {
      // Convert to integer
      return parseInt(value, 10) || 0; // Use parseInt with base 10, fallback to 0 if conversion fails
    }
  
    // Add additional type checks and conversions for other types if needed
  
    return value;
  };
  
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
  
  

// export const isiData = (results) => {
//     const dataPemasukan = [
//       {id: "tanggal_masuk", path: "data.0.tanggal_masuk"},
//       {id: "jumlah_masuk", path: "data.0.jumlah_masuk"},
//       {id: "sumber", path: "data.0.sumber"},
//       {id: "deskripsi", path: "data.0.deskripsi"},
//     ];
  
  
//     dataPemasukan.forEach(({ id, path, index, property }) => {
//       const inputElement = document.getElementById(id);
//       const value = getNestedValue(results, path, index, property);
//       inputElement.value = value;
//     });
//   }
  
//   const getNestedValue = (obj, path, index, property) => {
//     const value = path
//       .split(".")
//       .reduce((value, key) => (value && value[key] !== undefined ? value[key] : ""), obj);
  
  
//     if (
//       Array.isArray(value) &&
//       value.length > index &&
//       value[index].hasOwnProperty(property)
//     ) {
//       return value[index][property];
//     }
  
//     return value;
//   };