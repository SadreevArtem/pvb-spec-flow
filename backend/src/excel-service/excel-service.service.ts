import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as path from 'path';

@Injectable()
export class ExcelServiceService {
  async generateExcelFromTemplate(
    templatePath: string,
    outputDir: string,
    order: any,
  ): Promise<string> {
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
      row.getCell(4).value = item.tagNumber; // Наименование сущности
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

    // Формируем имя нового файла
    const outputFileName = `order_${order.id}.xlsx`;
    const outputPath = path.join(outputDir, outputFileName);

    // Сохраняем заполненный файл
    await workbook.xlsx.writeFile(outputPath);

    // Возвращаем путь к созданному файлу
    return outputPath;
  }
}
