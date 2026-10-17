import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/60182262240"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nyala Labs on WhatsApp"
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <FaWhatsapp aria-hidden="true" className="h-8 w-8" />
    </a>
  );
}
