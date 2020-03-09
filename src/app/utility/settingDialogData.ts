export class SettingDialogData {

  static prepareForOld(id: any, value: any, dataName: string) {
    const map: Map<string, string> = new Map();
    map.set('id', id);
    map.set('dataName', dataName);
    map.set('value', value);
    return map;
  }

  static prepareForNew(dataName: string) {
    const map: Map<string, string> = new Map();
    map.set('id', '0');
    map.set('dataName', dataName);
    map.set('value', '');
    return map;
  }
}
