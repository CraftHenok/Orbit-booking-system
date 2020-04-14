export class SettingDialogData {

  static prepare(dataName: string, id?: number, value?: any) {
    const map = new Map();
    map.set('id', id || '0');
    map.set('dataName', dataName);
    map.set('value', value || '');
    return map;
  }
}
