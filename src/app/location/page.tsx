'use client';

import { useEffect, useState } from 'react';
import BackgroundLogo from '@/components/BackgroundLogo';
import Image from 'next/image';
import Link from 'next/link';

const LocationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <BackgroundLogo opacity={0.03} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nuestra Ubicación
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Visítanos en nuestras modernas instalaciones ubicadas en Quines, San Luis.
          </p>
        </div>

        <div className="mt-12 bg-white shadow overflow-hidden rounded-lg">
          {/* Mapa */}
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '0.5rem', overflow: 'hidden' }}>
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
          
          {/* Información de ubicación */}
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Dirección</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>Calle Pringles entre Saavedra y Córdoba</p>
                  <p>Quines, San Luis</p>
                  <p className="mt-2">
                    <a 
                      href="https://www.google.com.ar/maps/place/Olimpo+Gym/@-32.2356697,-65.8074932,18z/data=!4m10!1m2!2m1!1sgimnasio+olimpo,quines+san+luis!3m6!1s0x95d4917ffe2738c7:0x5af9065b5a24a2cd!8m2!3d-32.2358553!4d-65.8059874!15sCh9naW1uYXNpbyBvbGltcG8scXVpbmVzIHNhbiBsdWlzkgEDZ3lt4AEA!16s%2Fg%2F11vdnsjycz?hl=es&entry=ttu"
                      className="text-gray-900 font-medium hover:text-gray-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver en Google Maps →
                    </a>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Horarios</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>Lunes a Viernes: 07:00 - 12:30, 14:00 - 23:00</p>
                  <p>Sábados: 09:00 - 13:00</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Contacto</h3>
              <div className="mt-2 text-base text-gray-500">
                <p>Teléfono: <a href="https://api.whatsapp.com/send/?phone=542304355852&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">+54 2304355852</a></p>
                <p className="mt-4">
                  <Link href="/contact" className="text-gray-900 font-medium hover:text-gray-700">
                    Envíanos un mensaje →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Galería de imágenes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Nuestras Instalaciones</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/images/gym-1.jpg" 
                alt="Instalaciones del gimnasio" 
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/images/gym-2.jpg" 
                alt="Área de pesas" 
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/images/gym-3.jpg" 
                alt="Área de cardio" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-500">
            ¿Listo para comenzar tu transformación?
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Contáctanos Hoy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
