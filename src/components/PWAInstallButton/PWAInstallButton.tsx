import { useState, useEffect } from 'react';
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: string; platform: string }>;
}

const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    // Проверка на мобильное устройство и планшет
    const checkMobileDevice = () => {
      const isMobile = /Mobi|Tablet|iPad|Android/i.test(navigator.userAgent);
      setIsMobileDevice(isMobile);
    };

    // Проверка устройства при монтировании компонента
    checkMobileDevice();

    // Устанавливаем слушатель на изменение размера экрана (если нужно)
    window.addEventListener('resize', checkMobileDevice);

    return () => {
      window.removeEventListener('resize', checkMobileDevice);
    };
  }, []);

  useEffect(() => {
    // Слушаем событие beforeinstallprompt
    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallEvent = event as BeforeInstallPromptEvent;
      // Запрещаем браузеру показывать стандартный диалог
      beforeInstallEvent.preventDefault();
      setDeferredPrompt(beforeInstallEvent);
    };

    // Устанавливаем обработчик события beforeinstallprompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);

    return () => {
      // Удаляем обработчик события beforeinstallprompt
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Важно, что теперь TypeScript знает, что здесь есть метод prompt()
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log(choiceResult.outcome);
        setDeferredPrompt(null); // Сбросить deferredPrompt после установки
      });
    }
  };

  // Устанавливаем кнопку только для мобильных устройств и планшетов
  if (!isMobileDevice || !deferredPrompt) {
    return null;
  }

  return (
    <div>
      <button onClick={handleInstall}>Установить приложение</button>
    </div>
  );
};

export default PWAInstallButton;
