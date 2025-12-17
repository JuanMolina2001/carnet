import React from 'react'
import { ScrollView, View } from 'react-native'
import Markdown from 'react-native-markdown-display';
export const TermsNconditions = () => {
  const text = `Los siguientes Términos y Condiciones regulan el uso de la aplicación móvil y plataforma web **CAR.NET**, desarrollada con el propósito de facilitar el reporte, búsqueda y recuperación de documentos personales extraviados, tales como cédulas de identidad, TNE u otras credenciales personales. Su uso implica la aceptación plena y sin reservas de todas las disposiciones aquí establecidas.

## **1. Aceptación de las Condiciones**

Al registrarse, acceder o utilizar la plataforma CAR.NET, el usuario declara haber leído, comprendido y aceptado los presentes Términos y Condiciones. En caso de no estar de acuerdo, deberá abstenerse de utilizar la plataforma.

## **2. Uso de la Plataforma**

CAR.NET proporciona a los usuarios las siguientes funciones principales:

* Registro de documentos extraviados.
* Publicación de documentos encontrados.
* Validación básica de identidad mediante RUT y fotografía.

El usuario se compromete a:

* Entregar información veraz, actualizada y comprobable.
* No utilizar la aplicación para actividades fraudulentas.
* No publicar contenido ofensivo, ilegal o que vulnere derechos de terceros.

## **3. Responsabilidad del Usuario**

Los usuarios que publiquen documentos encontrados son responsables de:

* Asegurar que el documento efectivamente fue encontrado en un contexto legítimo.
* Entregar información precisa del hallazgo (lugar, fecha, observaciones).
* Coordinar la devolución de forma segura, preferentemente en puntos oficiales.

Los usuarios que reporten documentos extraviados son responsables de verificar su identidad mediante los medios provistos por la plataforma.

## **4. Privacidad y Tratamiento de Datos**

CAR.NET almacena únicamente los datos necesarios para su correcto funcionamiento, tales como:

* Nombre, RUT y fotografía del usuario.
* Datos asociados a documentos perdidos o encontrados.
* Ubicación referencial del hallazgo.

El tratamiento de datos se realiza bajo estándares de seguridad, integridad y confidencialidad, sin compartir información con terceros, salvo cuando sea estrictamente necesario para apoyar procesos de recuperación o cumplir con requerimientos legales.


## **5. Verificación de Identidad**

La verificación de identidad dentro de CAR.NET puede incluir:

* Validación de RUT.
* Comparación de fotografías proporcionadas.

Estas funciones tienen por objetivo prevenir fraudes y asegurar que los documentos sean devueltos únicamente a sus titulares.

## **6. Publicación de Documentos**

Las personas que encuentren documentos pueden publicarlos en la plataforma bajo las siguientes condiciones:

* No deben divulgar información sensible visible .
* La publicación debe ser exacta y con intención legítima de devolver el documento.
* Queda estrictamente prohibida la oferta, venta o difusión indebida de documentos personales.

## **7. Limitación de Responsabilidad**

CAR.NET **no reemplaza** los procesos oficiales de instituciones como el Registro Civil, JUNAEB o Comisaría Virtual, los cuales continúan siendo los canales formales para la reposición o bloqueo de documentos (basado en los informes adjuntos, ejemplo: ).

La plataforma:

* No garantiza la recuperación de documentos.
* No se responsabiliza por fraudes, mal uso de datos publicados por usuarios o encuentros realizados fuera de los protocolos recomendados.

## **8. Seguridad**

La plataforma implementa medidas de seguridad tales como:

* Autenticación de usuarios.
* Conexiones cifradas (HTTPS).
* Reglas de acceso a datos .
* Encriptacion de datos sensibles.

Sin embargo, el usuario es responsable de mantener la confidencialidad de sus credenciales y notificar cualquier uso no autorizado.

## **9. Modificaciones a los Términos**

CAR.NET se reserva el derecho de modificar estos Términos y Condiciones, notificando a los usuarios por los canales disponibles. El uso continuado de la plataforma implica aceptación de los cambios.

## **10. Contacto y Soporte**

Para consultas, mejoras o reportes sobre el funcionamiento de la plataforma, los usuarios podrán comunicarse con los desarrolladores a través de los medios establecidos dentro de la aplicación o en el sitio web del proyecto.
`
  return (
    <View style={{flex:1}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex:1, padding: 16, marginBottom: 16 }}
      >
        <Markdown >
          {text}

        </Markdown>
      </ScrollView>

    </View>
  )
}
