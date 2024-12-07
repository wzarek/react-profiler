import { sendData } from './api';

export const sendErrorInfo = (
  error: Error,
  additionalInfo = '',
  location = 'Unknown'
) => {
  sendData({
    event_type: 'error',
    location,
    time_taken: 0,
    title: `Handled error sent: ${error.message}`,
    description: `${error.message}, ${additionalInfo}`,
  });
};
