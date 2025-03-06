import { useState, useEffect } from 'react';

const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIosDevice, setIsIosDevice] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    // Проверка на мобильные устройства
    const isMobile = /Mobi|Tablet|iPad|Android/i.test(navigator.userAgent);
    setIsMobileDevice(isMobile);

    // Проверка на iOS
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIosDevice(isIos);

    // Слушаем событие beforeinstallprompt (для поддерживающих браузеров)
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      // Показываем системное окно для установки
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Пользователь установил приложение');
        } else {
          console.log('Пользователь отклонил установку');
        }
        setDeferredPrompt(null); // Сбрасываем prompt после выбора
      });
    }
  };

  const handleIosInstall = () => {
    alert(
      'Чтобы установить приложение, откройте Safari, затем выберите "Добавить на экран" в меню "Поделиться".'
    );
  };

  if (!isMobileDevice) {
    return null; // Не показывать кнопку на десктопных устройствах
  }

  if (isIosDevice) {
    // Для iOS показываем альтернативное сообщение
    return (
      <div>
        <button onClick={handleIosInstall}>Установить на экран (iOS)</button>
      </div>
    );
  }

  // Для других мобильных браузеров (Android)
  return (
    <div>
      <button onClick={handleInstall}>Установить приложение</button>
    </div>
  );
};

export default PWAInstallButton;
