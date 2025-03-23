'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BackgroundLogo from '@/components/BackgroundLogo';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Componente que utiliza useSearchParams
function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verificar si hay un mensaje predefinido en los parámetros de la URL
  useEffect(() => {
    const messageParam = searchParams.get('message');
    if (messageParam) {
      setFormData(prev => ({
        ...prev,
        message: decodeURIComponent(messageParam)
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    // Construir el mensaje para WhatsApp
    const whatsappMessage = `*Consulta desde la web de Olimpo Gym*
*Nombre:* ${formData.name}
*Email:* ${formData.email}
${formData.phone ? `*Teléfono:* ${formData.phone}` : ''}
*Mensaje:*
${formData.message}`;

    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Abrir WhatsApp con el mensaje predefinido
    window.open(`https://api.whatsapp.com/send/?phone=542304355852&text=${encodedMessage}&type=phone_number&app_absent=0`, '_blank');
    
    // Mostrar confirmación
    toast.success('Redirigiendo a WhatsApp...');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre completo *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mensaje *
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje por WhatsApp'}
        </button>
      </div>
    </form>
  );
}

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <BackgroundLogo opacity={0.03} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contacto
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto grid grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Envíanos un mensaje</h3>
              <Suspense fallback={<div>Cargando formulario...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Información de contacto</h3>
              <div className="mt-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-sm text-gray-500">
                    <p className="font-medium text-gray-700">Dirección</p>
                    <p>Calle Pringles entre Saavedra y Córdoba</p>
                    <p className="mt-1">Quines, San Luis</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-sm text-gray-500">
                    <p className="font-medium text-gray-700">Teléfono</p>
                    <p>
                      <a href="https://api.whatsapp.com/send/?phone=542304355852&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                        +54 2304355852
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-sm text-gray-500">
                    <p className="font-medium text-gray-700">Email</p>
                    <p>
                      <a href="mailto:walterdamianmaidana100@gmail.com" className="hover:text-gray-900">
                        walterdamianmaidana100@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-sm text-gray-500">
                    <p className="font-medium text-gray-700">Horario</p>
                    <p>Lunes a Viernes 07:00 - 12:30, 14:00 - 23:00</p>
                    <p>Sábados 09:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Síguenos en redes sociales</h3>
              <div className="mt-6 flex space-x-6">
                <a href="https://www.instagram.com/olimpo.gym.qsl?igsh=MXRsdHdhaWp1enRoMA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.012 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <a href="https://www.instagram.com/olimpo.gym.qsl?igsh=MXRsdHdhaWp1enRoMA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <a href="https://www.instagram.com/olimpo.gym.qsl?igsh=MXRsdHdhaWp1enRoMA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                
                <a href="https://www.instagram.com/olimpo.gym.qsl?igsh=MXRsdHdhaWp1enRoMA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                
                <a href="https://wa.me/542304355852" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mapa de Google */}
        <div className="mt-12 bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Nuestra ubicación</h3>
            <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.3547670306763!2d-65.80598738484835!3d-32.235855281144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4917ffe2738c7%3A0x5af9065b5a24a2cd!2sOlimpo%20Gym!5e0!3m2!1ses!2sar!4v1711195840000!5m2!1ses!2sar" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Olimpo Gym"
              ></iframe>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Si no puedes ver el mapa, <a 
                href="https://www.google.com.ar/maps/place/Olimpo+Gym/@-32.2356697,-65.8074932,18z/data=!4m10!1m2!2m1!1sgimnasio+olimpo,quines+san+luis!3m6!1s0x95d4917ffe2738c7:0x5af9065b5a24a2cd!8m2!3d-32.2358553!4d-65.8059874!15sCh9naW1uYXNpbyBvbGltcG8scXVpbmVzIHNhbiBsdWlzkgEDZ3lt4AEA!16s%2Fg%2F11vdnsjycz?hl=es&entry=ttu"
                className="text-gray-900 font-medium hover:text-gray-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                haz clic aquí para ver en Google Maps
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
