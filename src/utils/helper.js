export const replaceAll = (text, replaceFrom, replaceAfter) => {
  const regex = new RegExp(replaceFrom, "g");
  const results = text?.replace(regex, replaceAfter);

  return results;
};

export const formatMoreText = (text, formatLength) => {
  const isTextLength = text?.length;

  if (isTextLength > formatLength) {
    return `${text?.substring(0, formatLength)}...`;
  }

  return text;
};

export const toRupiah = (int) => {
  if (typeof int === "string") {
    const replaceRP = replaceAll(int, "Rp ", "");
    const replaceKoma = replaceAll(replaceRP, ",", "");

    const isNumber = parseInt(replaceKoma);

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimunFractionDigits: 0,
    }).format(isNumber);
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimunFractionDigits: 0,
  }).format(int);
};

export const reFactorDataFromInfinite = (datas) => {
  const results = datas?.reduce((a, b) => ({
    meta: b.meta,
    data: b.data.concat(a.data),
  }));

  return results;
};
