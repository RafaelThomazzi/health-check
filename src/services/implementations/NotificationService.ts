import { SNS } from "aws-sdk";

export class SnsNotificationService {
  private sns: SNS;

  constructor() {
    this.sns = new SNS({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  }

  async sendSMS(phoneNumbers: string[], message: string): Promise<any> {
    try {
      for (const phoneNumber of phoneNumbers) {
        const params = {
          Message: message,
          PhoneNumber: phoneNumber,
        };
  
        console.log(params);
  
        const response = await this.sns.publish(params).promise();
        console.log({action: 'send-sms', status: 'success', message: response})
      }
    } catch (error) {
      console.log({action: 'send-sms', status: 'error', message: error.message})
      throw error;
    }
  }
}
