export const ZraDict: Record<string, string[]> = {
  "Задвижка клиновая": [
    "BOLT_ON_LID",
    "WEDGE_GATE_PARALLEL_SLIDING",
    "BELLOWS",
    "PRESSURE_SEAL_GATE",
    "HIGH_PRESSURE_PARALLEL_SLIDING",
  ],
  "Задвижка шиберная": ["SPHERICAL_PIPELINE_GATE"],
  "Клапан запорный": ["BOLTED_COVER"],
  Клапан: [
    "TYPE_Y",
    "BELLOWS_VALVE",
    "BELLOWS_TYPE_Y",
    "PRESSURE_SEAL_GLOBE",
    "PRESSURE_SEAL_GLOBE_TYPE_Y",
  ],
  "Шаровый клапан": ["ANGULAR"],
  "Обратный клапан": [
    "TURNING",
    "PISTON",
    "PISTON_TYPE_Y",
    "SWING_CHECK_PRESSURE_SEAL",
    "LIFT_CHECK_PRESSURE_SEAL_STRAIGHT",
    "LIFT_CHECK_PRESSURE_SEAL_Y_PATTERN",
    "INCLINED_DISK",
  ],
  "Кран шаровой": [
    "FLOATING_PLUG_SIDE_ENTRY",
    "TRUNNION_BALL_SIDE_ENTRY",
    "TRUNNION_BALL_TOP_ENTRY",
    "MONOBLOCK",
    "FLOATING_TWIN",
    "THREE_WAY",
  ],
  "Поворотный затвор": ["TWO_CENTERED", "THREE_CENTERED"],
};

type ConnectionGroup = "RF|B" | "BW|SW" | "RF|B|BW" | "RTJ|J" | "NPT";
type PressureClass = "150#" | "300#" | "600#" | "900#" | "1500#" | "2500#";

interface LengthTable {
  [pressureClass: string]: {
    [connectionGroup: string]: {
      [dn: string]: number;
    };
  };
}

export function getLength(
  connectionTypeName: string,
  pressureClass: PressureClass | string,
  dn: string,
  table: LengthTable
): number | null {
  // Карта соответствия типов присоединения группам
  const connectionMap: Record<string, ConnectionGroup> = {
    "ASME B16.5 RF": "RF|B",
    "ASME B16.5 RTJ": "RTJ|J",
    "ASME B16.47 RF": "RF|B",
    "ASME B16.47 RTJ": "RTJ|J",
    "BW TO ASME B16.25": "BW|SW",
    "BW ASME B16.25": "BW|SW",
    "SW ASME B16.11": "BW|SW",
    "NPT ASME B1.20.1": "NPT",
    "ГОСТ 33259-2015 Тип B": "RF|B",
    "ГОСТ 33259-2015 Тип J": "RTJ|J",
    "ГОСТ 33259-2015 Тип F": "RF|B",
    "ГОСТ 33259-2015 Тип E": "RF|B",
    "ГОСТ 33259-2015 Тип C": "RF|B",
  };

  const group = connectionMap[connectionTypeName];
  if (!group) {
    console.warn(`Неизвестный тип соединения: ${connectionTypeName}`);
    return null;
  }

  const groupTable = table[pressureClass];
  if (!groupTable) {
    console.warn(`Неизвестный класс давления: ${pressureClass}`);
    return null;
  }

  // Сначала пытаемся найти точную группу
  const lengthGroup = groupTable[group];
  if (lengthGroup && lengthGroup[dn]) {
    return lengthGroup[dn];
  }

  // Если группа не найдена, ищем в комбинированных, например RF|B|BW
  for (const [groupName, values] of Object.entries(groupTable)) {
    const connectionTypes = groupName.split("|");
    if (connectionTypes.includes(group.split("|")[0]) && values[dn]) {
      return values[dn];
    }
  }

  console.warn(
    `Данные не найдены для DN: ${dn} в группе: ${group} (${pressureClass})`
  );
  return null;
}
