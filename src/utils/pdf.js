const PdfPrinter = require("pdfmake");

exports.generate = (conversions) => {
  const fonts = { Roboto: { normal: "Helvetica" } };
  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      { text: "Daily Conversion Report", style: "header" },
      {
        table: {
          body: [
            ["From", "To", "Amount", "Result", "Date"],
            ...conversions.map(c => [c.from, c.to, c.amount, c.result, c.createdAt.toISOString()])
          ]
        }
      }
    ]
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  let chunks = [];
  return new Promise((resolve, reject) => {
    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
    pdfDoc.end();
  });
};