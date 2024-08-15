import * as Clipboard from 'expo-clipboard';
import { ToastApp } from './Toast';

export const copyToClipboard = async (textToCopy, message) => {
    await Clipboard.setStringAsync(textToCopy);
    ToastApp(message || 'Text copied to clipboard!');
}