import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ExitButton() {
  const navigate = useNavigate();

  const handleExit = () => {
    if (document.pointerLockElement) document.exitPointerLock();
    navigate('/');
  };

  return (
    <button
      type="button"
      onClick={handleExit}
      className="fixed top-4 right-4 z-30 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/55 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition hover:bg-black/75">
      <LogOut size={16} />
      <span>Quitter le monde</span>
    </button>
  );
}
