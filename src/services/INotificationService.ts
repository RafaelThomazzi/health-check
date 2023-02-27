export interface INotificationService {
  sendSMS(phoneNumbers: string[], message: string): Promise<any>;
}
