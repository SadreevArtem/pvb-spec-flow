import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as path from 'path';
import * as PdfPrinter from 'pdfmake';
import * as fs from 'fs';

@Injectable()
export class ExcelServiceService {
  async generateExcelFromTemplate(
    templatePath: string,
    outputDir: string,
    order: any,
  ): Promise<{ excelName: string; pdfName: string }> {
    const workbook = new Workbook();

    // Загружаем шаблон
    await workbook.xlsx.readFile(templatePath);

    // Выбираем лист (например, первый)
    const worksheet = workbook.getWorksheet(1);

    // Заполняем данные в ячейки
    worksheet.getCell('A2').value = order.customer?.name || 'Не указан'; // Заказчик
    worksheet.getCell('B2').value = order.contractNumber; // Номер договора

    order.items.forEach((item, index) => {
      const row = worksheet.getRow(index + 2);
      row.getCell(3).value = index + 1; // Номер позиции
      row.getCell(4).value = item.tagNumber; // TAG
      row.getCell(5).value = item.techTaskNumber; // Номер технологического задания
      row.getCell(6).value = order.equipmentType.name; // Наименование ЗРА
      row.getCell(7).value = item.productType.name; // Тип продукции
      row.getCell(8).value = item.productType.model; // Модель
      row.getCell(9).value = item.construction.name; // Конструкция
      row.getCell(10).value = item.manufacturingStandart.name; //Стандарт изготовления
      row.getCell(11).value = item.diameter.name; // ДУ
      row.getCell(12).value = item.classPressure.name; // Класс давления
      row.getCell(13).value =
        item.workEnvironment === 'liquid' ? 'жидкость' : 'газ'; // Рабочая среда
      row.getCell(14).value = item.temperature; // Температура рабочей среды
      row.getCell(15).value = item.tightnessClass.name; // Класс герметичности
      row.getCell(16).value = item.temperatureRange.name; // Температурный диапазон
      row.getCell(17).value = item.housingMaterial.name; // Материал корпуса
      row.getCell(18).value = item.rodMaterial.name; // Материал штока
      row.getCell(19).value = item.wedgeMaterial.name; // Материал клина
      row.getCell(20).value = item.housingMaterial.name; // Материал седла
      row.getCell(21).value = item.connectionType.name; // Тип соединения
      row.getCell(22).value = item.constructionLength; // Строительная длина
      row.getCell(23).value = item.nace ? 'да' : 'нет'; // насе
      row.getCell(24).value = item.counterFlanges ? 'да' : 'нет'; // ответный фланцы
      row.getCell(25).value = item.counterFlangesMaterial.name; // Материал ответных фланцев
      row.getCell(26).value = item.hairpins; // шпильки
      row.getCell(27).value = item.nuts; // Гайки
      row.getCell(28).value = item.pipeSize; // Размер трубы
      row.getCell(29).value = item.pipeMaterial.name; // Материал трубы
      row.getCell(30).value = item.drive; // привод
      row.getCell(31).value = item.driveKit; // комплект привода
      row.getCell(32).value = item.comment; // Примечание
      row.getCell(33).value = item.count; // Количество
    });

    const lastFilledRow = worksheet.lastRow?.number || 0;
    let currentRow = lastFilledRow + 2;

    // Добавляем заголовок "Перечень поставляемой документации"
    worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
    const titleRow1 = worksheet.getRow(currentRow);
    titleRow1.getCell(1).value = 'Перечень поставляемой документации';
    titleRow1.getCell(1).alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };
    titleRow1.font = { bold: true };
    currentRow++;

    // Данные для "Перечень поставляемой документации"
    const additionalData1 = [
      { value: 'Документация', condition: order.documentationSheet },
      { value: 'Чертежи установки', condition: order.installationDrawings },
      { value: 'Сборочный чертеж', condition: order.assemblyDrawing },
      { value: 'Протокол согласования', condition: order.agreementProtocol },
      {
        value: 'Инструкции по монтажу',
        condition: order.installationInstructions,
      },
      { value: 'План качества', condition: order.qualityPlan },
      { value: 'Сертификат материалов', condition: order.materialsCertificate },
      { value: 'Декларация ТР ТС', condition: order.declarationOfTRTC },
    ];

    additionalData1.forEach((data) => {
      if (data.condition) {
        worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
        const row = worksheet.getRow(currentRow);
        row.getCell(1).value = data.value;
        row.getCell(1).alignment = {
          vertical: 'middle',
          horizontal: 'left',
          wrapText: true,
        };
        currentRow++;
      }
    });

    // Добавляем заголовок "Дополнительная документация и тесты"
    worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
    const titleRow2 = worksheet.getRow(currentRow);
    titleRow2.getCell(1).value = 'Дополнительная документация и тесты';
    titleRow2.getCell(1).alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };
    titleRow2.font = { bold: true };
    currentRow++;

    // Данные для "Дополнительная документация и тесты"
    const additionalData2 = [
      {
        value: 'Присутствие заказчика при испытаниях',
        condition: order.presenceOfCustomerDuringTesting,
      },
      {
        value: 'Газовый осмотр высокого давления',
        condition: order.gasInspectionHighPressure,
      },
      {
        value: 'Инспекция третьей стороны',
        condition: order.thirdSideInspection,
      },
    ];

    additionalData2.forEach((data) => {
      if (data.condition) {
        worksheet.mergeCells(`A${currentRow}:F${currentRow}`);
        const row = worksheet.getRow(currentRow);
        row.getCell(1).value = data.value;
        row.getCell(1).alignment = {
          vertical: 'middle',
          horizontal: 'left',
          wrapText: true,
        };
        currentRow++;
      }
    });
    // Формируем имя нового файла
    const outputFileNameXLS = `order_${order.id}.xlsx`;
    const outputPath = path.join(outputDir, outputFileNameXLS);

    // Сохраняем заполненный файл
    await workbook.xlsx.writeFile(outputPath);

    // Возвращаем путь к созданному файлу
    // Создаем PDF на основе данных
    const fonts = {
      Roboto: {
        normal: path.join(
          __dirname,

          'fonts',
          'Roboto-Regular.ttf',
        ),
        bold: path.join(
          __dirname,

          'fonts',
          'Roboto-Bold.ttf',
        ),
        italics: path.join(
          __dirname,

          'fonts',
          'Roboto-Italic.ttf',
        ),
        bolditalics: path.join(
          __dirname,
          'node_modules',
          'pdfmake',
          'fonts',
          'Roboto-BoldItalic.ttf',
        ),
      },
    };

    const printer = new PdfPrinter(fonts);
    // Таблица с данными для PDF
    const tableBody = [
      [
        { text: '№' },
        { text: 'TAG' },
        { text: 'Номер по ТЗ' },
        { text: 'Наименование ЗРА' },
        { text: 'Тип ЗРА' },
        { text: 'Модель' },
        { text: 'Конструкция' },
        { text: 'Стандарт изготовления' },
        { text: 'ДУ' },
        { text: 'Ру' },
        { text: 'Рабочая среда' },
        { text: 'Температура рабочей среды' },
        { text: 'Класс герметичности' },
        { text: 'Темепратурный диапазон' },
        { text: 'Материал корпуса' },
        { text: 'Материал штока' },
        { text: 'Материал клина' },
        { text: 'Материал седла' },
        { text: 'Тип соединения' },
        { text: 'Строительная длина' },
        { text: 'NACE' },
        { text: 'Ответные фланцы' },
        { text: 'Материал ответных фланцев' },
        { text: 'Шпильки' },
        { text: 'Гайки' },
        { text: 'Размер трубы' },
        { text: 'Материал трубы' },
        { text: 'Привод' },
        { text: 'Комплект привода' },
        { text: 'Примечание' },
        { text: 'Количество' },
      ],
    ];

    order.items.forEach((item, index) => {
      tableBody.push([
        index + 1,
        item.tagNumber || '',
        item.techTaskNumber || '',
        order.equipmentType.name || '',
        item.productType.name || '',
        item.productType.model || '',
        item.construction.name || '',
        item.manufacturingStandart.name || '',
        item.diameter.name || '',
        item.classPressure.name || '',
        item.workEnvironment || '',
        item.temperature || '',
        item.tightnessClass.name || '',
        item.temperatureRange.name || '',
        item.housingMaterial.name || '',
        item.rodMaterial.name || '',
        item.wedgeMaterial.name || '',
        item.housingMaterial.name || '',
        item.connectionType.name || '',
        item.constructionLength || '',
        item.nace ? 'да' : 'нет',
        item.counterFlanges ? 'да' : 'нет',
        item.counterFlangesMaterial.name || '',
        item.hairpins || '',
        item.nuts || '',
        item.pipeSize || '',
        item.pipeMaterial.name || '',
        item.drive || '',
        item.driveKit || '',
        item.comment || '',
        item.count || '',
      ]);
    });

    // Добавляем дополнительные данные
    // if (additionalData1.some((data) => data.condition)) {
    //   tableBody.push([
    //     {
    //       text: 'Дополнительная документация и тесты',
    //     },
    //   ]);

    //   additionalData2.forEach((data) => {
    //     if (data.condition) {
    //       tableBody.push([{ text: data.value }]);
    //     }
    //   });
    // }

    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Заказ', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: [
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
            ],
            body: tableBody,
          },
          style: 'table',
        },
      ],
      styles: {
        header: {
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        table: {
          fontSize: 3,
        },
      },
    };
    const additionalContent = [];

    // Перечень поставляемой документации
    additionalContent.push({
      text: 'Перечень поставляемой документации',
      style: 'subheader',
      margin: [0, 20, 0, 5],
    });

    additionalData1.forEach((data) => {
      if (data.condition) {
        additionalContent.push({ text: `- ${data.value}`, fontSize: 8 });
      }
    });

    // Дополнительная документация и тесты
    if (
      order.presenceOfCustomerDuringTesting ||
      order.gasInspectionHighPressure ||
      order.thirdSideInspection
    ) {
      additionalContent.push({
        text: 'Дополнительная документация и тесты',
        style: 'subheader',
        margin: [0, 20, 0, 5],
      });

      const additionalData = [
        {
          value: 'Присутствие заказчика при испытаниях',
          condition: order.presenceOfCustomerDuringTesting,
        },
        {
          value: 'Газовый осмотр высокого давления',
          condition: order.gasInspectionHighPressure,
        },
        {
          value: 'Инспекция третьей стороны',
          condition: order.thirdSideInspection,
        },
      ];

      additionalData.forEach((data) => {
        if (data.condition) {
          additionalContent.push({ text: `- ${data.value}`, fontSize: 8 });
        }
      });
    }

    // Добавляем этот контент в основной docDefinition
    docDefinition.content.push(...additionalContent);

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks: any[] = [];

    // Сохраняем PDF в файл
    const pdfFileName = `order_${order.id}.pdf`;
    const pdfPath = path.join(outputDir, pdfFileName);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => {
        const buffer = Buffer.concat(chunks);
        // Сохраняем PDF в файл
        fs.writeFileSync(pdfPath, buffer);
        resolve(buffer);
      });
      pdfDoc.on('error', (err) => reject(err));
      pdfDoc.end();
    });

    return { excelName: outputFileNameXLS, pdfName: pdfFileName };
  }
}
