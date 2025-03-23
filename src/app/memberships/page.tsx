'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import BackgroundLogo from '@/components/BackgroundLogo';
import toast from 'react-hot-toast';

interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number | string;
  priceDisplay?: string;
  duration_days: number;
  features: string[];
  is_popular?: boolean;
}

const MembershipsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Planes actualizados según solicitud
  const defaultPlans: MembershipPlan[] = [
    {
      id: '1',
      name: 'MUSCULACIÓN',
      description: 'Acceso completo a la sala de musculación',
      price: 0,
      priceDisplay: 'Consultar precio actual',
      duration_days: 30,
      features: [
        'Acceso ilimitado a sala de musculación',
        'Horario completo (8:00 - 22:00)',
        'Evaluación inicial',
        'Rutina personalizada',
        'Acceso a vestuarios',
      ],
    },
    {
      id: '2',
      name: 'KICKBOXING',
      description: 'Clases de kickboxing con entrenadores profesionales',
      price: 'Según frecuencia',
      duration_days: 30,
      features: [
        'Clases de kickboxing',
        'Equipamiento incluido',
        'Entrenadores certificados',
        'Acceso a vestuarios',
        'Horarios flexibles',
      ],
      is_popular: true,
    },
    {
      id: '3',
      name: 'PERSONALIZADO',
      description: 'Entrenamiento personalizado adaptado a tus objetivos',
      price: 'Según frecuencia',
      duration_days: 30,
      features: [
        'Entrenador personal exclusivo',
        'Plan nutricional',
        'Seguimiento de progreso',
        'Horarios a convenir',
        'Acceso completo a todas las instalaciones',
        'Evaluación semanal',
      ],
    },
  ];

  useEffect(() => {
    // Simulamos una carga breve para mostrar el spinner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSelectPlan = (plan: MembershipPlan) => {
    // Crear mensaje predefinido según el plan seleccionado
    let mensaje = '';
    
    if (plan.id === '1') {
      mensaje = `Hola, estoy interesado/a en el plan de MUSCULACIÓN. Me gustaría obtener más información sobre cómo inscribirme y los horarios disponibles.`;
    } else if (plan.id === '2') {
      mensaje = `Hola, estoy interesado/a en el plan de KICKBOXING. Me gustaría saber los precios según la frecuencia semanal y los horarios de las clases disponibles.`;
    } else if (plan.id === '3') {
      mensaje = `Hola, estoy interesado/a en el plan PERSONALIZADO. Me gustaría recibir información sobre los precios según la frecuencia semanal y coordinar una entrevista con un entrenador.`;
    }
    
    // Redirigir a la página de contacto con el mensaje predefinido
    // Usamos encodeURIComponent para asegurar que el mensaje se transmita correctamente en la URL
    router.push(`/contact?message=${encodeURIComponent(mensaje)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <BackgroundLogo opacity={0.03} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Planes de Membresía
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Elige el plan que mejor se adapte a tus necesidades y objetivos
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {defaultPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.is_popular ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              {plan.is_popular && (
                <div className="absolute top-0 right-0 -mt-3 mr-3">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-900 text-white">
                    Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {plan.priceDisplay || (typeof plan.price === 'number' ? `$${plan.price}` : plan.price)}
                  </span>
                  {!plan.priceDisplay && <span className="text-base font-medium text-gray-500">/mes</span>}
                </p>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className="mt-8 block w-full bg-gray-900 border border-gray-900 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-700"
                >
                  Consultar
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900">Incluye:</h4>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            ¿Tienes preguntas sobre nuestros planes? Contáctanos al{' '}
            <a href="tel:+542304355852" className="font-medium text-gray-900 underline">
              +54 2304355852
            </a>{' '}
            o visita nuestro gimnasio.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MembershipsPage;
