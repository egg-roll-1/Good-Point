import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export const errorHandler = (error) => {
  if (isAxiosError(error)) {
    toast(`${error?.response?.data?.message ?? ''}`, {
      theme: 'colored',
      type: 'error',
    });
    return;
  }

  toast(`오류가 발생했어요.`, {
    theme: 'colored',
    type: 'error',
  });
};
