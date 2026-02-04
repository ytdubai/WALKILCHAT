import { useState } from 'react';
import { useRouter } from 'next/router';
import { Phone, Video, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingCallButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const initiateCall = (type: 'voice' | 'video') => {
    router.push(`/contacts?callType=${type}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed right-6 bottom-24 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 flex flex-col gap-4"
          >
            <button
              onClick={() => initiateCall('video')}
              className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-glow-cyan hover:scale-110 transition-transform"
            >
              <Video size={24} />
            </button>
            <button
              onClick={() => initiateCall('voice')}
              className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow-purple hover:scale-110 transition-transform"
            >
              <Phone size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleMenu}
        className={`p-4 rounded-full text-white transition-all transform ${
          isOpen
            ? 'bg-gray-700 rotate-45'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <Phone size={24} />}
      </button>
    </div>
  );
}