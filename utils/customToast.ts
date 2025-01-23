import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastType } from '@/types/types';

export default function customToast(msg: string, type: ToastType) {
    toast.dismiss();
    switch (type) {
        case 'success':
            toast.success(msg);
            break;
        case 'warning':
            toast.warning(msg);
            break;
        case 'error':
            toast.error(msg);
            break;
        case 'info':
            toast.info(msg);
            break;
        default:
            toast(msg);
    }
}
