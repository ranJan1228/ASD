export const checkSystemRequirements = async () => {
  try {
    // Check webcam access
    const hasWebcam = await navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        stream.getTracks().forEach(track => track.stop());
        return true;
      })
      .catch(() => false);

    // Check browser compatibility
    const isCompatibleBrowser = 'mediaDevices' in navigator;

    return {
      hasWebcam,
      isCompatibleBrowser,
      canProceed: hasWebcam && isCompatibleBrowser
    };
  } catch (error) {
    console.error('Error checking system requirements:', error);
    return {
      hasWebcam: false,
      isCompatibleBrowser: false,
      canProceed: false
    };
  }
}; 