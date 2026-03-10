export default function WhatsappFloat() {

const whatsappChannel = "https://whatsapp.com/channel/0029VbC5z2O8fewpMKi1mN1u";

return ( <a
   href={whatsappChannel}
   target="_blank"
   rel="noopener noreferrer"
   className="whatsapp-float"
 > <img src="/whatsapp-icon.png" alt="WhatsApp" /> </a>
);
}
